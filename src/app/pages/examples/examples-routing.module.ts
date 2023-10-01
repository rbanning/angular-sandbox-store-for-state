import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesComponent } from './examples.component';

const routes: Routes = [
  { 
    path: '', 
    component: ExamplesComponent,
    children: [
      {
        path: 'product-list',
        loadChildren: () => import('./lazy-loaded/product-list/product-list.module').then(m => m.ProductListModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule { }
