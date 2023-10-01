import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ProductListComponent } from './product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';



@NgModule({
  declarations: [
    ProductListComponent,
  ],
  imports: [
    SharedModule,
    ProductListRoutingModule
  ]
})
export class ProductListModule { }
