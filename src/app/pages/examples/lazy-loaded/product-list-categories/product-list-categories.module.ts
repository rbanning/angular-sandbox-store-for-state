import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ProductListCategoriesRoutingModule } from './product-list-categories-routing.module';
import { ProductListCategoriesComponent } from './product-list-categories.component';



@NgModule({
  declarations: [
    ProductListCategoriesComponent
  ],
  imports: [
    SharedModule,
    ProductListCategoriesRoutingModule
  ]
})
export class ProductListCategoriesModule { }
