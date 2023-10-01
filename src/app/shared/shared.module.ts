import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedComponents } from './components';



@NgModule({
  declarations: [
    sharedComponents
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    sharedComponents
  ]
})
export class SharedModule { }
