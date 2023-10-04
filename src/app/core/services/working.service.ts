import { BehaviorSubject, Observable, filter } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * WorkingService allows different players (e.g. services, components, etc.) 
 * indicate that they are doing some sort of work.
 * This is done by each player registering a unique key when toggling work.
 * Each of these keys is stored in the _register and for the app state to be "working", 
 * any one of these registered players can be working.
 * In other words, for the app state to be NOT "working",
 * ALL of the registered players must not be working.
**/

type Register = {[key: string]: boolean};

@Injectable({
  providedIn: 'root'
})
export class WorkingService {
  protected _register: Register = {}; 
  protected _subject = new BehaviorSubject<boolean>(false);

  get isWorking(): boolean {
    return Object.keys(this._register).some((key) => this._register[key] === true);
  }

  working$(): Observable<boolean> {
    return this._subject.asObservable(); 
  }

  setWorking(key: string, value: boolean) {
    this._register[key] = value;
    this._subject.next(this.isWorking);
  }

  clear() {
    //resets the register (clears all keys) and updates the subject.
    this._register = {};
    this._subject.next(false);
  }
}
