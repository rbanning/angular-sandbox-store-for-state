import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="site-container">
      <app-header></app-header>
      <div class="section">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
      <app-working [auto]="true" label="working..."></app-working>
    </div>
  `,
  styles: []
})
export class AppComponent {

}
