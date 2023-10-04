// import { StoreStatus } from './store-base.model';
import { Observable, BehaviorSubject, of, map } from 'rxjs';
import { IStoreState } from './store-state.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Nullable, parsers } from '../common';

export type StoreStatus = 'pending' | 'ready' | 'working' | 'error';
export type StoreStatusWithError = [StoreStatus, Nullable<any>];

export type KeyOfItem = string | number;

export type FilterFunction<T> = (item: T, pattern: Nullable<string>) => boolean;

/** Generic:
 * T = individual item
 * C = format of the stored collection of items (e.g. array - T[] or dictionary - [key:any]: T[])
 * IN = format of the incoming collection of items (e.g. array)
 * OUT = format of the outputted collection (defaults to just the collection)
 */
export abstract class StoreBase<T, IN, OUT> {

  protected _statusSubject = new BehaviorSubject<StoreStatus>('pending');
  protected _errorSubject = new BehaviorSubject<any>(null);

  protected _store: any;
  protected _subject = new BehaviorSubject<Nullable<OUT>>(null);

  //todo: complete incorporating filtering into the store
  protected _filterSubject = new BehaviorSubject<Nullable<string>>(null);
  filterFn: FilterFunction<T> = () => { return true};

  //note: if initial is Nullable, then the state will remain 'pending'
  //      if it is nonNullable, then the state will be set to 'ready'
  constructor(
    protected key: keyof T,             //the unique key (field name) of the item T 
    initial: Nullable<IN> = null        //the initial value of the store (defaults to null)
  ) {
    this.load(initial); 
  }

  // **** public access to the store **** //
  getObservable$(): Observable<Nullable<OUT>> {
    return this._subject.asObservable();
  }
  peek(): Nullable<OUT> {
    return this._subject.value;
  }

  // **** error **** //
  get error(): any {
    return this._errorSubject.value;
  }
  set error(value: any) {
    this.setError(value);
  }

  getError$(): Observable<any> {
    return this._errorSubject.asObservable();
  }

  setError(value: any) {
    if (value instanceof HttpErrorResponse) {
      this._errorSubject.next(this.processHttpError(value));
    } else {
      this._errorSubject.next(value);
    }
  }

  private processHttpError(err: HttpErrorResponse): string {
    if (err) {
      return parsers.fromHttpError(err) ?? 'Unknown server error';
    }
    //else
    return 'Unknown error';
  }

  // **** status **** //
  get status(): StoreStatus {
    return this._statusSubject.value;
  }
  set status(value: StoreStatus) {
    this.setStatus(value);
  }

  getStatus$(): Observable<StoreStatus> {
    return this._statusSubject.asObservable();
  }

  getStatusWithError$(): Observable<StoreStatusWithError> {
    return this.getStatus$()
      .pipe(
        map(status => [status, this.error])
      );
  }

  setStatus(value: StoreStatus, error: any = null) {
    this.setError(error); //important - set the error before changing the status
    this._statusSubject.next(value);
  }
  //update status based on the value of _store
  protected updateStatus() {
    this.setStatus(!!this._store ? 'ready' : 'pending');
  }  

  // **** Create StoreState object **** //
  getStoreState(): IStoreState<OUT> {
    return {
      status$: this.getStatus$(),
      data$: this.getObservable$(),
      error: () => this.error
    };
  }

  // **** reducers: used to transform the collection **** //

  // transform collection to be stored in the _store
  protected storeReducerIn(collection: any) {
    return collection;
  }

  // transform _store to be consumed in the subject(observable)
  protected storeReducerOut(collection: any) {
    return collection;
  }


  protected predicate(lookup: T): (item: T) => boolean {
    throw new Error('Not Implemented - predicate()');
  }

  count() {
    if (this._store && this._store.hasOwnProperty('length')) {
      return this._store.length;
    }

    //else
    return 0;
  }

  find(id: string | number): Nullable<T> {
    throw new Error('Not Implemented - find()');
  }

  filter(options: any): Observable<Nullable<OUT>> {
    console.error('Not Implemented - filter()');
    return of(null);
  }

  add(item: T): void {
    throw new Error('Not Implemented - add()');
  }

  replace(item: T): void {
    throw new Error('Not Implemented - replace()');
  }

  delete(item: T): void {
    throw new Error('Not Implemented - delete()');
  }

  clear(): void {
    this._store = this.storeReducerIn(null);
    this.publish();
  }

  load(data: Nullable<IN>): void {
    this._store = this.storeReducerIn(data);    //convert (reduce) the raw data before putting it in the _store
    this.publish()                              //publish the data via the observable
  }

  protected publish() {
    this.updateStatus();  //resets the status and removes errors
    this._subject.next(this.storeReducerOut(this._store));
  }

  destroy() {
    this._statusSubject.complete();
    this._errorSubject.complete();
    this._subject.complete();
  }

}
