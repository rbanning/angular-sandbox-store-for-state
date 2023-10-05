import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { UserSearchRoutingModule } from './user-search-routing.module';
import { UserSearchComponent } from './user-search.component';


@NgModule({
  declarations: [
    UserSearchComponent
  ],
  imports: [
    SharedModule,
    UserSearchRoutingModule
  ]
})
export class UserSearchModule { }
