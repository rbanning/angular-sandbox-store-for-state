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
    key: 'product-list',
    title: "Products with Categories",
    description: "Array of products with popup category descriptions from a Dictionary Store",
    icon: "./assets/categories.png",
    route: ['product-list-categories']
  },
  {
    key: 'user-search',
    title: "User Search",
    description: "Array of users is stored in an Array Store and uses a custom filter to perform a search",
    icon: "./assets/users.png",
    route: ['user-search']
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
