import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListCategoriesComponent } from './product-list-categories.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProductListCategoriesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListCategoriesRoutingModule { }
