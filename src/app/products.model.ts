export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public image: string,
    public name: string,
    public spiciness: number,
    public nuts: boolean,
    public vegetarian: boolean,
    public quantity: number
  ) {}
}