import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { WorkingService } from './core/services';

@Component({
  selector: 'app-root',
  template: `
    <div class="site-container">
      <app-header></app-header>
      <div class="section">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
      <app-working [show$]="working$" label="working..."></app-working>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'angular-sandbox-store-for-state';
  working$: Observable<boolean>;

  constructor(protected workingService: WorkingService) {
    this.working$ = workingService.working$();
  }
}
