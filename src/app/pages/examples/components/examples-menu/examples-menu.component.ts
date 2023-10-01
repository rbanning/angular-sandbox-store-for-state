import { Component, Input } from '@angular/core';
import { ExamplesMenuService, ExamplesMenuType, ExamplesMenuCollection } from '@app/core/services';

@Component({
  selector: 'app-examples-menu',
  templateUrl: './examples-menu.component.html',
  styles: [
  ]
})
export class ExamplesMenuComponent {
  @Input()
  type: ExamplesMenuType = 'full';

  items: ExamplesMenuCollection;


  constructor(service: ExamplesMenuService) {
    this.items = service.fetch();
  }
}
