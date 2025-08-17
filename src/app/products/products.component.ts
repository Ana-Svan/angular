import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../products.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  id: number = 0;
  title: string = '';
  price: number = 0;
  description: string = '';
  category: string = '';
  rating: number = 0;

  products: Product[] = [];
  showList: boolean = false;
  searchTerm: string = '';

  saveProduct() {
    const newProduct = new Product(this.id, this.title, this.price, this.description, this.category, this.rating);
    this.products.push(newProduct);

    // Inputs zurücksetzen
    this.id = 0;
    this.title = '';
    this.price = 0;
    this.description = '';
    this.category = '';
    this.rating = 0;
  }

  

  toggleShow() {
    this.showList = !this.showList;
  }

  get filteredProducts(): Product[] {
    return this.products.filter(p =>
      p.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
