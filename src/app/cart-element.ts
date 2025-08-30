import { Product } from "./products.model";

export class CartElement {
  constructor(
    public price: number,
    public product: Product,
    public quantity: number,
  ) {}
}