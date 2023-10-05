import { Injectable } from '@angular/core';
import { Observable, map, tap, catchError, of } from 'rxjs';

import { IUser, User } from '@app/models';
import { StoreArray } from '@app/store';
import { RemoteApiService } from './remote-api.service';
import { Nullable, primitive, strHelp } from '@app/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected _store = new StoreArray<IUser>('id');

  constructor(
    protected remoteApi: RemoteApiService
  ) { }

  getState$() {
    return this._store.getStatus$();
  }

  load(forceRefresh: boolean = false): Observable<Nullable<IUser[]>> {
    if (this._store.status !== 'ready' || forceRefresh) {
      return this.loadFromRemote();
    }
    //else (get from the store - cached)
    return this._store.getStoreState().data$;
  }

  filter(pattern: string): Observable<Nullable<IUser[]>> {
    return this._store.filter(this.filterPredicate(pattern));
  }


  //included just in case
  find(id: string, forceRefresh: boolean = false): Observable<Nullable<IUser>> {
    //be sure the data is loaded first
    return this.load(forceRefresh)
      .pipe(
        map(_ => {
          //and now return the requested item from the store
          return this._store.find(id);
        })
      );
  }


  protected loadFromRemote(): Observable<Nullable<IUser[]>> {
    return this.remoteApi.fetch('users')
      .pipe(
        map((result) => {
          if (primitive.isArray(result)) {
            return result.map((p: any) => new User(p));
          }
          //else
          console.warn("Unknown result returned from remote api (expected an array)", {result});
          return null;
        }),
        tap((products: Nullable<IUser[]>) => {
          if (products) {
            //sort
            products.sort((a,b) => strHelp.stringCompare(a.username,b.username)); //sorting by username (asc)
  
            //store
            this._store.load(products);
          }
        }),
        catchError((err) => {
          this._store.setStatus('error', err);
          return of(null);
        })
      );
  }

  protected filterPredicate(pattern: string) {
    pattern = pattern.toLocaleLowerCase();
    return (user: Nullable<IUser>) => {
      if (user) {
        const checkThese = [
          user.username,
          user.email,
          user.address?.city ?? null,
          user.name?.firstname ?? null,
          user.name?.lastname ?? null
        ].map(value => value?.toLocaleLowerCase());
        return checkThese.some((value) => value && value.includes(pattern));
      }
      //else
      return false;
    }
  }
}
