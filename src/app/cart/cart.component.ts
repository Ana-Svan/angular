import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../products.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
   cartProducts: Product[] = []
   @Output() close = new EventEmitter<void>();

   constructor(private http: HttpClient) {}

   
  ngOnInit() {
    this.getCartProducts();
  }
   
  getCartProducts() {
    this.http
      .get<any[]>('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
      .subscribe({
        next: data => {
          this.cartProducts = data; 
        },
        error: err => {
          console.error('Error:', err);
        }
      });
  }
}
