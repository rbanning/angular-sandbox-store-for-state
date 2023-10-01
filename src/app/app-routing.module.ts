import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, NotFoundComponent } from './pages';

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
    loadChildren: () => import('./pages/examples/examples.module').then(m => m.ExamplesModule)
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
