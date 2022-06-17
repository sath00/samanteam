import {Category} from "./Category"

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: Category;
  imagePath: string;
  availability: string;
}
