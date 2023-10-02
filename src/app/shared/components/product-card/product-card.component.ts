import { Component, Input } from '@angular/core';
import { Nullable } from '@app/common';
import { IProduct } from '@app/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styles: [
  ]
})
export class ProductCardComponent {
  @Input()
  item: Nullable<IProduct>

  @Input()
  detailed: boolean = false;
}
