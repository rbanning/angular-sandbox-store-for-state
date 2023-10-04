import { parsers, primitive } from "../common";
import { IProduct, Product } from "./product.model";

export interface ICategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  products?: IProduct[];
}

export class Category implements ICategory {
  id: string = '';
  title: string = ''; 
  description: string = ''; 
  icon: string = './assets/default-category.png'; 
  products?: IProduct[];

  constructor(obj?: any) {
    if (obj) {
      this.id = parsers.toString(obj.id) ?? this.id;
      this.title = parsers.toString(obj.title) ?? this.title; 
      this.description = parsers.toString(obj.description) ?? this.description; 
      this.icon = parsers.toString(obj.icon) ?? this.icon;
      if (primitive.isArray(obj.products)) {
        this.products = obj.products.map((p: any) => new Product(p));
      }
    }
  }

}