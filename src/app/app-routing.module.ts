import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesComponent, HomeComponent, NotFoundComponent, ProductListComponent } from './pages';

const routes: Routes = [
  { 
    path: 'home',
    component: HomeComponent
  },
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'examples',
    component: ExamplesComponent
  },

  { 
    path: 'products',
    component: ProductListComponent
  },


  // 404
  { 
    path: '**', 
    pathMatch: 'full', 
    component: NotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
