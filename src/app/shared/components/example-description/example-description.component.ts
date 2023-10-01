import { Component, Input } from '@angular/core';
import { Nullable } from '@app/common';

@Component({
  selector: 'app-example-description',
  templateUrl: './example-description.component.html',
  styles: [
  ]
})
export class ExampleDescriptionComponent {
  @Input()
  name: Nullable<string>;
}
