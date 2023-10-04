import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription, Observable } from 'rxjs';

import { Nullable } from '@app/common';
import { ProductService } from '@app/core/services';
import { IProduct } from '@app/models';
import { StoreStatus } from '@app/store';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent {
  status$: Observable<StoreStatus>;

  protected subscription: Subscription[] = [];
  product$!: Observable<Nullable<IProduct>>;
  
  constructor(
    protected service: ProductService,
    protected location: Location,
    route: ActivatedRoute,
  ) {
    this.status$ = this.service.getState$();
    this.subscription.push(
      route.params.subscribe({
        next: (params) => {
          this.product$ = service.find(params["id"]);
        }
      })
    )
  }

  addToCard(product:IProduct) {
    console.log("todo: implement adding this product to a cart", {product});
    this.back();
  }

  back() {
    this.location.back();
  }
}
