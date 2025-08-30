import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  addToCart(quantity: number, price: number, productId: number) {
     const body = {
        productId: productId,
        quantity: quantity,
        price: price
      };

      this.http
        .post<any>('https://restaurant.stepprojects.ge/api/Baskets/AddToBasket', body)
        .subscribe({
          next: data => {
            console.log('Product added to cart:', data);
          },
          error: err => {
            console.error('Error:', err);
        }
    });
  }

  deleteFromCart(index: number) {
    return this.http
      .delete<any>(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${index}`
      )
  }
}
