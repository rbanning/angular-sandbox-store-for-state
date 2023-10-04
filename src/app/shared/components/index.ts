import { ExampleDescriptionComponent } from "./example-description/example-description.component";
import { ModalComponent } from "./modal/modal.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductGridComponent } from "./product-grid/product-grid.component";
import { WorkingComponent } from "./working/working.component";

export const sharedComponents = [
  ExampleDescriptionComponent,
  WorkingComponent,
  ProductGridComponent,
  ProductCardComponent,
  ModalComponent
];

export * from './example-description/example-description.component';
export * from './working/working.component';
export * from './product-grid/product-grid.component';
export * from './product-card/product-card.component';