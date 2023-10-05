import { Component, Input } from '@angular/core';
import { Nullable } from '@app/common';
import { IUser } from '@app/models';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styles: [
  ]
})
export class UserCardComponent {
  @Input()
  user: Nullable<IUser>
}
