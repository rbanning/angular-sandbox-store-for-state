import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <h1 class="flex items-center gap-2">
      <span class="text-warn-800 text-6xl">404</span>
      <span class="text-warn-300">Not Found</span>
    </h1>
    <p>The resource you requested could not be found!</p>
  `,
  styles: [
  ]
})
export class NotFoundComponent {

}
