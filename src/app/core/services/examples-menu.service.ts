import { Injectable } from '@angular/core';
import { ExamplesMenuCollection } from './examples-menu.types';

const examplesRepo: ExamplesMenuCollection = [
  {
    key: 'product-list',
    title: "Product List",
    description: "Simple array of products initially loaded from remote API and cached using Array Store",
    icon: "./assets/list.png",
    route: ['product-list']
  },
  {
    key: 'user-dictionary',
    title: "User Dictionary",
    description: "Dictionary of users initially loaded from remote API and cached using Dictionary Store",
    icon: "./assets/users.png",
    route: ['user-dictionary']
  },
]


@Injectable({
  providedIn: 'root'
})
export class ExamplesMenuService {

  constructor() { }

  fetch() {
    return [...examplesRepo];
  }
}
