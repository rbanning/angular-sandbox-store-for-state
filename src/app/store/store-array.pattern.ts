import { Nullable } from '../common';
import { StoreBase } from './store-base.model';

/**
 * Most basic pattern for storing a collection of items.
 * The data come IN as an array of items
 * and the data comes OUT as an array of items.
 * 
 * Generally, there is not much to the reducers (IN or OUT)
 */

export class StoreArray<T> extends StoreBase<T, T[], T[]> {
  constructor(key: keyof T, initial: Nullable<T[]> = null) {
    super(
      key,
      initial
    );
  }

  //OVERLOADS -internal
  protected override predicate(lookup: T): (item: T) => boolean {
    return (item: T) => {
      if (lookup && item) {
        return lookup[this.key] === item[this.key];
      }
      //else
      return false;
    }
  }

  //OVERLOADS -public
  override count() {
    if (this._store) {
      return this._store.length;
    }
    //else
    return 0;
  }

  override find(id: string | number): Nullable<T> {
    if (this._store) {
      return this._store.find((item: any) => item[this.key] === id);
    }
    //else
    return null;
  }

  override add(item: T): void {
    if (!this._store) { this._store = []; }
    this._store = [...this._store, item];
    this.publish();
  }

  override replace(item: T): void {
    if (this._store) {
      const index = this._store.findIndex(this.predicate(item));
      if (index >= 0) {
        this._store[index] = {...item};
        this.publish();
      } else {
        console.warn('StoreArray - unable to find item to replace', {item, store: this._store});
      }
    }
  }

  override delete(item: T): void {
    if (this._store) {
      const index = this._store.findIndex(this.predicate(item));
      if (index >= 0) {
        this._store.splice(index, 1);
        this.publish();
      } else {
        console.warn('StoreArray - unable to find item to delete', {item, store: this._store});
      }
    }
  }

  override clear(): void {
    this._store = [];
    this.publish();
  }

  override load(data: T[]) {
    this._store = Array.isArray(data) ? [...data] : data;
    this.publish();
  }
}

