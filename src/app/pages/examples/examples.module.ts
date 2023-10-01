import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples.component';
import { exampleComponents } from './components';


@NgModule({
  declarations: [
    ExamplesComponent,
    exampleComponents
  ],
  imports: [
    SharedModule,
    ExamplesRoutingModule
  ]
})
export class ExamplesModule { }
