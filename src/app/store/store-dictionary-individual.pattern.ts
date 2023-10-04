import { Nullable } from '../common';
import { KeyOfItem, StoreBase } from './store-base.model';

/**
 * This dictionary store is useful when you need 
 * quick access to an item (lookup is on order of 1),
 * but also need to access the collection as an array.
 *  
 * For a this type-safe dictionary, the input (IN) and output (OUT) 
 * are both arrays of the item.  However, the data is stored as
 * a type-safe dictionary based on some unique key so that 
 * the `find()` is maximized for performance.
 * 
 * By default, the StoreDictionary uses the primary key
 * of the items (as defined in the first param of the constructor - key)
 * as the directory lookup key.
 * 
 * However, this can be overridden either by setting the `uniqueKeyField` property
 * or by setting the `getUniqueLookupKey()` function.
 * 
 * The `uniqueKeyField` should be the name of a field of T that uniquely identifies that item.
 * 
 * The `getUniqueLookupKey()` function accepts an item (of type T) and returns 
 * the unique key used to identify that item.
 */

export class StoreDictionary<T>
              extends StoreBase<T, T[], T[]> {

  /*** these are used to get the unique identifier for each item  ***/
  uniqueKeyField: Nullable<keyof T>;
  getUniqueLookupKey(item: T): KeyOfItem {
    //this should return the unique identifier for the item
    //      , not the name of the key (field)
    return item[this.uniqueKeyField ?? this.key] as KeyOfItem; //force  
  }


  constructor(key: keyof T, initial: Nullable<T[]> = null /* see note on StoreBase */) {
    super(key, initial);
  }


  // helper
  protected _getLookupKey(item: T): KeyOfItem {
    try {
      const key = this.getUniqueLookupKey(item);
      if (typeof(key) === 'string' || typeof(key) === 'number') { return key; }
      //else 
      throw new Error(`Invalid lookup get returned by getUniqueLookupKey() - ${key === null ? 'null' : typeof(key)}`);  
    } catch (error) {
      console.warn("StoreDictionary - unable to get the key for an item", {item, error});
      throw new Error("StoreDictionary was unable to get the key for an item");
    }
  }

  protected _setItem(item: T): boolean {
    const key = this._getLookupKey(item);
    if (key) {
      if (!this._store) { this._store = {}; }
      this._store[key] = {...item};
      return true;
    }
    //else
    return false;
  }

  //OVERLOADS
  protected override predicate(lookup: T): (item: T) => boolean {
    throw new Error('Not Supported - predicate()');
  }
  // transform collection to be stored in the _store (as a type-safe dictionary)
  protected override storeReducerIn(collection: any) {
    let ret = null;
    if (collection) {
      ret = collection.reduce((acc: any, item: T) => {
        acc[this._getLookupKey(item)] = item;
        return acc;
      }, {});
    }
    return ret;
  }

  // transform _store to be consumed in the subject(observable) (as array)
  protected override storeReducerOut(collection: any) {
    // store to array
    if (collection) {
      return Object.keys(collection)
      .map((key: KeyOfItem) => collection[key]);
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

  override find(id: KeyOfItem): Nullable<T> {
    if (this._store) {
      return this._store[id];
    }
    //else
    return null;
  }

  override add(item: T): void {
    if (this._setItem(item)) {
      this.publish();
    } else {
      console.warn('StoreDictionary (add/replace) - unable to find item\'s key', 
        { item, 
          keyField: this.uniqueKeyField ?? this.key,
          uniqueLookupField: this.getUniqueLookupKey(item), 
          store: this._store
        });
    }
  }


  replaceOriginal(item: T, originalLookupKey: KeyOfItem): void {
    if (this._store && this._store[originalLookupKey]) {
      delete this._store[originalLookupKey];
    }
    //replace is the same as inserting the item (add)
    this.add(item);
  }
  
  override replace(item: T): void {
    //WARNING: this will NOT remove the original item if the unique lookup key has changed.
    //          For the most part, the unique lookup key should not change so we are allowing this simple replacement
    //          However, if there is a chance that the key will change, use `replaceOriginal()`
    
    //replace is the same as inserting the item (add)
    this.add(item);
  }

  override delete(item: T): void {
    const key = this._getLookupKey(item);
    if (key !== undefined) {
      delete this._store[key]
      this.publish();
    } else {
      console.warn('StoreDictionary (delete) - unable to find item\'s key', {item, key, keyField: this.key, store: this._store});
    }
  }

}
