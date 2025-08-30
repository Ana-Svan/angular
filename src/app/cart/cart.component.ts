import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../products.model';
import { CartElement } from '../cart-element';
import { CartService } from '../services/cart.service';
import { from, timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
   cartElements: CartElement[] = []
   @Output() close = new EventEmitter<void>();

   constructor(private http: HttpClient, private cartService: CartService) {}

   
  ngOnInit() {
    this.getCartProducts();
  }
   
  getCartProducts() {
    this.http
      .get<any[]>('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
      .subscribe({
        next: data => {  
        let groupedProducts = this.groupProducts(data);
        this.cartElements = groupedProducts;

        console.log(this.cartElements);
        },
        error: err => {
          console.error('Error:', err);
        }
      });
  }

  addToCart(quantity: number, price: number, productId: number) {
     this.cartService.addToCart(quantity, price, productId);

     const item = this.cartElements.find(el => el.product.id === productId);
     if (!item) return;

     if (item.quantity > 1) {
      item.quantity += 1; 
    }
  }

  deleteFromCart(productId: number) {
    this.cartService.deleteFromCart(productId)
      .subscribe({
        next: data => console.log('Product deleted from cart:', data),
        error: err => console.error('Error:', err)
      });

     const item = this.cartElements.find(el => el.product.id === productId);
     if (!item) return;

     if (item.quantity > 1) {
      item.quantity -= 1; 
    } else {
      const index = this.cartElements.indexOf(item);
      this.cartElements.splice(index, 1);
    }
  }

  deleteAllFromCart(productId: number) {
     const items = this.cartElements.filter(el => el.product.id === productId);
     const item = this.cartElements.find(el => el.product.id === productId);
     if (!item) return;

    const units = Array(item.quantity).fill(productId);

    from(units).pipe(
      concatMap(id => this.cartService.deleteFromCart(id).pipe(
        concatMap(() => timer(100)) 
      ))
    ).subscribe({
      next: () => console.log('Product deleted'),
      complete: () => {
        this.cartElements = this.cartElements.filter(el => el.product.id !== productId);
      },
      error: err => console.error('Error:', err)
    });

      this.cartElements = this.cartElements.filter(item => item.product.id !== productId);
  } 

  groupProducts(data: any[]): CartElement[] {
    const grouped = data.reduce((grouped, item) => {
      const id = item.product.id;
        if (!grouped[id]) {
          grouped[id] = { ...item, quantity: 1 };
        } else {
          grouped[id].quantity += 1; 
        }
        return grouped;
      }, {} as { [key: number]: any });

      return Object.values(grouped);
    }
    
}
