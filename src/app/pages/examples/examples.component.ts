import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styles: [
  ]
})
export class ExamplesComponent {
  state: 'parent' | 'child' = 'parent';

  constructor(
    router: Router
  ) {
    router.events
      .pipe(
        filter((ev) => ev instanceof NavigationEnd)
      )
      .subscribe({
        next: ((ev) => {
          this.state = (ev as NavigationEnd).url.split('/').filter(Boolean).length > 1 ? 'child' : 'parent';
        })
      })
  }
}
