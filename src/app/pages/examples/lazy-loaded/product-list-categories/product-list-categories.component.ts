import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Nullable } from '@app/common';
import { CategoryService, ProductService } from '@app/core/services';
import { ICategory, IProduct } from '@app/models';
import { StoreStatus } from '@app/store';

@Component({
  selector: 'app-product-list-categories',
  templateUrl: './product-list-categories.component.html',
  styles: [
  ]
})
export class ProductListCategoriesComponent implements OnDestroy {
  status$: Observable<StoreStatus>;
  products$: Observable<Nullable<IProduct[]>>;
  category: Nullable<ICategory>; //selected category

  private subscriptions: Subscription[] = [];

  constructor(
    protected productService: ProductService,
    protected categoryService: CategoryService) {

    this.status$ = productService.getState$();
    this.products$ = productService.load();
    this.subscriptions.push(this.categoryService.load().subscribe());  
  }

  ngOnDestroy(): void {
      if (this.subscriptions) {
        this.subscriptions.forEach(sub => sub.unsubscribe());
      }
  }

  refresh() {
    this.products$ = this.productService.load(true);
    this.subscriptions.push(this.categoryService.load(true).subscribe());
  }

  handleCategoryClick(name: string) {
    this.categoryService.find(name)
      .subscribe({
        next: (category) => {
          if (category) {
            this.category = category;
          }
        }
      })
  }

  clearCategory() {
    this.category = null;
  }
}
