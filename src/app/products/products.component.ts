import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../products.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  filteredProducts: Product[] = [];
  showList: boolean = true;
  searchTerm: string = '';

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.http
      .get<any[]>('https://restaurant.stepprojects.ge/api/Products/GetAll')
      .subscribe({
        next: data => {
          this.filteredProducts = data; 
          console.log('Products:', this.filteredProducts);
        },
        error: err => {
          console.error('Error:', err);
        }
      });
  }

  addToCart(quantity: number, price: number, productId: number) {
     this.cartService.addToCart(quantity, price, productId);
  }

  //  saveProduct() {
  //   const newProduct = new Product(this.id, this.title, this.price, this.description, this.category, this.rating);
  //   this.products.push(newProduct);
// 
  //   // Inputs zurücksetzen
  //   this.id = 0;
  //   this.title = '';
  //   this.price = 0;
  //   this.description = '';
  //   this.category = '';
  //   this.rating = 0;
  // }

}
