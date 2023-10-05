import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Nullable } from '@app/common';
import { UserService } from '@app/core/services';
import { IUser } from '@app/models';
import { StoreStatus } from '@app/store';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styles: [
  ]
})
export class UserSearchComponent implements OnDestroy {
  status$: Observable<StoreStatus>;
  users$: Observable<Nullable<IUser[]>>;

  ctrl: FormControl = new FormControl('');
  pattern: Nullable<string>;

  protected subscriptions: Subscription[] = [];

  constructor(protected service: UserService) {
    this.status$ = service.getState$();
    this.users$ = of([]);

    this.subscriptions.push(
      this.service.load().subscribe() //preload
    )

  }

  ngOnDestroy(): void {
      if (this.subscriptions) {
        this.subscriptions.forEach(sub => sub.unsubscribe());
      }
  }

  filter(pattern: string) {
    this.pattern = pattern;
    if (pattern) {
      this.users$ = this.service.filter(pattern);
    }
  }

  refresh() {
    this.subscriptions.push(
      this.service.load(true).subscribe({
        next: _ => this.refreshSearch()
      }) //refresh search after loaded
    )
  }

  reset() {
    this.ctrl.setValue('');
    this.refreshSearch();
  }

  handleInput(event: KeyboardEvent) {
    switch (event.code ?? event.key) {
      case 'Enter':
        this.refreshSearch();
        break;
      case 'Esc':
        this.reset();
        break;
    }

  }
  refreshSearch() {
    this.filter(this.ctrl.value);
  }

  protected emptyUserList(): Observable<IUser[]> {
    return of([]);
  }
}
