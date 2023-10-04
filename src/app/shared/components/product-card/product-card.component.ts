import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Input()
  categories: Nullable<boolean>;

  @Output()
  categoryClick = new EventEmitter<string>();

  @Output()
  addToCart = new EventEmitter<IProduct>();

  add() {
    if (this.item) {
      this.addToCart.emit(this.item);
    }
  }

  handleCategoryClick(category: string) {
    this.categoryClick.emit(category);
  }
}
