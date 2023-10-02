import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sharedComponents } from './components';



@NgModule({
  declarations: [
    sharedComponents
  ],
  imports: [
    CommonModule,
    RouterModule, //for routerLink directive
  ],
  exports: [
    CommonModule,
    sharedComponents
  ]
})
export class SharedModule { }
