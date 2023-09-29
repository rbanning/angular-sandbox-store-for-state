import { ExamplesComponent } from "./examples/examples.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ProductListComponent } from "./product-list/product-list.component";

export const pageComponents = [
  HomeComponent,
  NotFoundComponent,
  ExamplesComponent,
  ProductListComponent,
];


export * from './home/home.component';
export * from './not-found/not-found.component';
export * from './examples/examples.component';
export * from './product-list/product-list.component';