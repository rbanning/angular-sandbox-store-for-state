import { Nullable } from '../common';
import { StoreBase } from './store-base.model';

export class StoreDictionary<T>
              extends StoreBase<T, T[], T[]> {

  constructor(key: keyof T, initial: T[] = []) {
    super(key, initial);
  }


  // helper
  protected _getKey(item: T): Nullable<T[keyof T]> {
    const key = item[this.key];
    return (typeof(key) === 'string' || typeof(key) === 'number') ? key : undefined;
  }

  protected _setItem(item: T): boolean {
    const key = this._getKey(item);
    if (key !== undefined) {
      if (!this._store) { this._store = {}; }
      this._store[item[this.key]] = {...item};
      return true;
    }
    //else
    return false;
  }

  //OVERLOADS
  protected override predicate(lookup: T): (item: T) => boolean {
    throw new Error('Not Supported - predicate()');
  }
  // transform collection to be stored in the _store
  protected override storeReducerIn(collection: any) {
    let ret = null;
    if (collection) {
      ret = collection.reduce((acc: any, item: T) => {
        acc[this._getKey(item)] = item;
        return acc;
      }, {});
    }
    return ret;
  }

  // transform _store to be consumed in the subject(observable)
  protected override storeReducerOut(collection: any) {
    // store to array
    if (collection) {
      return Object.keys(collection)
      .map((key: string | number) => collection[key]);
    }

    //else
    return null;
  }

  override count() {
    if (this._store) {
      return Object.keys(this._store).length;
    }

    //else
    return 0;
  }

  override find(id: string | number): Nullable<T> {
    if (this._store) {
      return this._store[id];
    }
    //else
    return null;
  }

  override add(item: T): void {
    this.replace(item); //same code
  }


  override replace(item: T): void {
    if (this._setItem(item)) {
      this.publish();
    } else {
      console.warn('StoreDictionary (add/replace) - unable to find item\'s key', {item, keyField: this.key, store: this._store});
    }
  }

  override delete(item: T): void {
    const key = this._getKey(item);
    if (key !== undefined) {
      delete this._store[key]
      this.publish();
    } else {
      console.warn('StoreDictionary (delete) - unable to find item\'s key', {item, key, keyField: this.key, store: this._store});
    }
  }

}
