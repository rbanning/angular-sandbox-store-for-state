import { strHelp } from "@app/common";
import { ICategory } from "@app/models";

export const categoryRepo: ICategory[] = [
  {
    id: "women's clothing",
    title: "Women's Clothing",
    description: "Hexagon vape wayfarers before they sold out photo booth keytar ascot flannel brunch",
    icon: '/assets/category-w-clothing.png'
  },
  {
    id: "men's clothing",
    title: "Men's Clothing",
    description: "Godard glossier sriracha venmo, semiotics la croix cray tousled migas mumblecore cronut kinfolk deep v.",
    icon: '/assets/category-m-clothing.png'
  },
  {
    id: "electronics",
    title: "Electronics",
    description: "Photo booth hoodie keytar mustache 8-bit, man bun flexitarian taiyaki iceland.",
    icon: '/assets/category-electronics.png'
  },
  {
    id: "jewelery", //this is how it is spelled in the api
    title: "Jewelry",
    description: "Sriracha austin art party raw denim tonx. Tumblr viral vaporware",
    icon: '/assets/category-jewelry.png'
  },
  {
    id: "jewelry",
    title: "Jewelry",
    description: "Sriracha austin art party raw denim tonx. Tumblr viral vaporware",
    icon: '/assets/category-jewelry.png'
  },
];

export const genericCategory = (id: string) => {
  return {
    id,
    title: strHelp.capitalize(id),
    description: "Master cleanse unicorn gluten-free asymmetrical, franzen ennui marxism beard actually tumblr ethical single-origin coffee readymade.",
    icon: '/assets/default-category.png'
  } as ICategory;
}