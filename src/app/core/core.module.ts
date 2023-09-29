import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { coreComponents } from './components';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    coreComponents
  ],
  imports: [
    CommonModule,
    RouterModule 
  ],
  exports: [
    coreComponents
  ]
})
export class CoreModule { }
