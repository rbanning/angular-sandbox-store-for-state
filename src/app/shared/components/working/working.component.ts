import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Nullable } from '@app/common';

@Component({
  selector: 'app-working',
  templateUrl: './working.component.html',
  styles: [
  ]
})
export class WorkingComponent {
  @Input()
  show: Nullable<boolean>;
  @Input()
  show$: Observable<boolean> = of(false);

  @Input()
  label: Nullable<string>;
}
