import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sharedComponents } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { sharedPipes } from './pipes';



@NgModule({
  declarations: [
    sharedComponents,
    sharedPipes
  ],
  imports: [
    CommonModule,
    RouterModule, //for routerLink directive
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    sharedComponents,
    sharedPipes
  ],
})
export class SharedModule { }
