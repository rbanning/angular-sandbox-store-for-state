import { parsers } from "../common";

export interface IProduct {
  id: string;
  title: string; 
  price: string; 
  category: string; 
  description: string; 
  image: string; 
}

export class Product implements IProduct {
  id: string = '';
  title: string = ''; 
  price: string = ''; 
  category: string = ''; 
  description: string = ''; 
  image: string = './assets/default-product.png'; 

  constructor(obj?: any) {
    if (obj) {
      this.id = parsers.toString(obj.id) ?? this.id;
      this.title = parsers.toString(obj.title) ?? this.title; 
      this.price = parsers.toString(obj.price) ?? this.price; 
      this.category = parsers.toString(obj.category) ?? this.category; 
      this.description = parsers.toString(obj.description) ?? this.description; 
      this.image = parsers.toString(obj.image) ?? this.image;
    }
  }
}