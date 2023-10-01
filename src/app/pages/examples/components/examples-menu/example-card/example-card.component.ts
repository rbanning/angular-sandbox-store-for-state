import { Component, Input } from '@angular/core';
import { IExample } from 'src/app/core/services';

@Component({
  selector: 'app-example-card',
  templateUrl: './example-card.component.html',
  styles: [
  ]
})
export class ExampleCardComponent {
  @Input()
  item!: IExample;

  @Input()
  details: boolean = false;
}
