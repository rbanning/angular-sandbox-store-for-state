import { Injectable } from '@angular/core';
import { Observable, map, tap, catchError, of } from 'rxjs';

import { IProduct, Product } from '@app/models';
import { StoreArray } from '@app/store';
import { RemoteApiService } from './remote-api.service';
import { Nullable, primitive } from '@app/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected _store = new StoreArray<IProduct>('id');

  constructor(
    protected remoteApi: RemoteApiService
  ) { }

  getState$() {
    return this._store.getStatus$();
  }

  load(forceRefresh: boolean = false): Observable<Nullable<IProduct[]>> {
    if (this._store.status !== 'ready' || forceRefresh) {
      return this.loadFromRemote();
    }
    //else (get from the store - cached)
    return this._store.getStoreState().data$;
  }


  protected loadFromRemote(): Observable<Nullable<IProduct[]>> {
    return this.remoteApi.fetch('products')
      .pipe(
        map((result) => {
          if (primitive.isArray(result)) {
            return result.map((p: any) => new Product(p));
          }
          //else
          console.warn("Unknown result returned from remote api (expected an array)", {result});
          return null;
        }),
        tap((products: IProduct[]) => {
          this._store.load(products);
        }),
        catchError((err) => {
          this._store.setStatus('error', err);
          return of(null);
        })
      );
  }
}
