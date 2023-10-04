import { Injectable } from '@angular/core';
import { Observable, map, tap, catchError, of } from 'rxjs';

import { ICategory, Category, Product, IProduct } from '@app/models';
import { StoreDictionary } from '@app/store';
import { RemoteApiService } from './remote-api.service';
import { Nullable, arrayHelp, primitive } from '@app/common';
import { categoryRepo, genericCategory } from './category.repo';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //NOTE: using a dictionary to make lookup faster!
  protected _store = new StoreDictionary<ICategory>('id');

  constructor(
    protected remoteApi: RemoteApiService
  ) { 
  }

  getState$() {
    return this._store.getStatus$();
  }

  load(forceRefresh: boolean = false): Observable<Nullable<ICategory[]>> {
    if (this._store.status !== 'ready' || forceRefresh) {
      return this.loadFromRemote();
    }
    //else (get from the store - cached)
    return this._store.getStoreState().data$;
  }

  find(id: string, forceRefresh: boolean = false): Observable<Nullable<ICategory>> {
    //be sure the data is loaded first
    return this.load(forceRefresh)
      .pipe(
        map(_ => {
          //and now return the requested item from the store
          return this._store.find(id);
        })
      );
  }


  protected loadFromRemote(): Observable<Nullable<ICategory[]>> {
    //The categories are stored statically but
    // we simulate an api call by getting the products
    // which we need for the ICategory.products field anyways. 
    //We could use the ProductService to get the products but 
    // for this demo, we want to simulate a initial long process.
    return this.remoteApi.fetch('products')
      .pipe(
        map((result) => {
          if (primitive.isArray(result)) {
            const products = result.map((p: any) => new Product(p));
            return this.processProductsToCategories(products);
          }
          //else
          console.warn("Unknown result returned from remote api (expected an array)", {result});
          return null;
        }),
        tap((categories: Nullable<ICategory[]>) => {
          this._store.load(categories);
        }),
        catchError((err) => {
          this._store.setStatus('error', err);
          return of(null);
        })
      );
  }

  protected processProductsToCategories(products: IProduct[]): ICategory[] {
    //get ids of the categories (removing duplicates)
    const categoryNames: string[] = arrayHelp.unique(products.map(p => p.category));
    return categoryNames.map(category => this.buildCategory(category, products));
  }
  
  protected buildCategory(category: string, products: IProduct[]): ICategory {
    const ret = new Category(categoryRepo.find(c => c.id === category) ?? genericCategory(category));
    ret.products = products.filter(p => p.category === category);
    return ret;
  }
}

