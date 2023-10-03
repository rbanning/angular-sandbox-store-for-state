import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Nullable } from '@app/common';
import { ProductService } from '@app/core/services';
import { IProduct } from '@app/models';
import { StoreStatus } from '@app/store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent {
  status$: Observable<StoreStatus>;
  products$: Observable<Nullable<IProduct[]>>;

  constructor(protected service: ProductService) {
    this.status$ = service.getState$();
    this.products$ = service.load();
  }

  refresh() {
    this.products$ = this.service.load(true);
  }
}
