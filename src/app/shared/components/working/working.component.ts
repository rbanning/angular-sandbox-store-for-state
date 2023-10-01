import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WorkingService } from '@app/core/services';
import { Nullable, primitive } from '@app/common';

@Component({
  selector: 'app-working',
  templateUrl: './working.component.html',
  styles: [
  ]
})
export class WorkingComponent implements OnInit {
  @Input()
  show: Nullable<boolean>;
  @Input()
  show$: Nullable<Observable<boolean>>;
  @Input()
  auto: boolean = false; //if set to true, then show$ will be taken from the WorkingService

  @Input()
  label: Nullable<string>;

  constructor(protected service: WorkingService) { }

  ngOnInit(): void {
    if (primitive.isNullish(this.show) && primitive.isNullish(this.show$)) {
      this.show$ = this.service.working$();
    }
  }

  clear() {
    this.service.clear();
  }
}
