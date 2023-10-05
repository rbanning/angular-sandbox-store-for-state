import { Nullable, parsers, primitive } from "@app/common";


export interface IName {
  firstname: string;
  lastname: string;
}

export interface IGeoLocation {
  lat: string;
  long: string;
}

export const isGeoLocation = (value: unknown): value is IGeoLocation => {
  return (primitive.isNotNullish(value) 
    && primitive.isString((value as IGeoLocation).lat) 
    && primitive.isString((value as IGeoLocation).long));
}

export interface IAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: IGeoLocation;
}


export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  name: Nullable<IName>;
  address: Nullable<IAddress>;
  phone: string;
}

export class User implements IUser {
  id: string = '';
  email: string = ''
  username: string = ''
  password: string = ''
  name: Nullable<IName>;
  address: Nullable<IAddress>;
  phone: string = ''

  constructor(obj?: any) {
    this.id = parsers.toString(obj.id) ?? this.id;
    this.email = parsers.toString(obj.email) ?? this.email;
    this.username = parsers.toString(obj.username) ?? this.username;
    this.password = parsers.toString(obj.password) ?? this.password;
    this.phone = parsers.toString(obj.phone) ?? this.phone;
    this.name = typeof(obj.name) === 'object' ? obj.name : null;
    this.address = typeof(obj.address) === 'object' ? obj.address : null;
  }
}