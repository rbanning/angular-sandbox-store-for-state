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
      },
      {
        path: 'product-list-categories',
        loadChildren: () => import('./lazy-loaded/product-list-categories/product-list-categories.module').then(m => m.ProductListCategoriesModule)
      },
      {
        path: 'user-search',
        loadChildren: () => import('./lazy-loaded/user-search/user-search.module').then(m => m.UserSearchModule)
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule { }
