import { Component, Input } from '@angular/core';
import { Nullable } from '@app/common';
import { IProduct } from '@app/models';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styles: [
  ]
})
export class ProductGridComponent {
  @Input()
  items: Nullable<IProduct[]>;

}
