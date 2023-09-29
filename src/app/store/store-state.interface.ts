import { Observable } from 'rxjs';
import { StoreStatus } from './store-base.model';
import { Nullable } from '../common';

export interface IStoreState<T> {
  status$: Observable<StoreStatus>;
  data$: Observable<Nullable<T>>;
  error(): any;
}
