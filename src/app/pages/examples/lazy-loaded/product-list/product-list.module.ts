import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ProductListComponent } from './product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    SharedModule,
    ProductListRoutingModule
  ]
})
export class ProductListModule { }
