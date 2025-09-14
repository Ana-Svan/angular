import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { CartElement } from '../cart-element';
import { from, timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule, LoginComponent, RegisterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  @Input() isAuthenticated = false;  
  @Output() close = new EventEmitter<void>();
  @Output() loggedIn = new EventEmitter<void>();
  @Output() loggedOut = new EventEmitter<void>();
  mode: 'login' | 'register' = 'login';

  cartElements: CartElement[] = [];

  constructor(private http: HttpClient, private cartService: CartService, private auth: AuthService) {}

  ngOnInit() {
    if (this.isAuthenticated) {
      this.getCartProducts();
    }
  }

  onClose() {
    this.close.emit();
  }

  onLoginSuccess() {
    this.isAuthenticated = true;
    this.loggedIn.emit(); 
    this.getCartProducts();
  }

  onRegisterSuccess() {
    this.mode = 'login';
  }

  getCartProducts() {
    this.http.get<any[]>('https://restaurant.stepprojects.ge/api/Baskets/GetAll').subscribe({
      next: data => {
        this.cartElements = this.groupProducts(data);
        console.log(this.cartElements);
      },
      error: err => console.error('Error:', err)
    });
  }

  addToCart(quantity: number, price: number, productId: number) {
    this.cartService.addToCart(quantity, price, productId);

    const item = this.cartElements.find(el => el.product.id === productId);
    if (!item) return;

    item.quantity += 1;
  }

  deleteFromCart(productId: number) {
    this.cartService.deleteFromCart(productId).subscribe({
      next: data => console.log('Product deleted from cart:', data),
      error: err => console.error('Error:', err)
    });

    const item = this.cartElements.find(el => el.product.id === productId);
    if (!item) return;

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.cartElements = this.cartElements.filter(el => el.product.id !== productId);
    }
  }

  deleteAllFromCart(productId: number) {
    const item = this.cartElements.find(el => el.product.id === productId);
    if (!item) return;

    const units = Array(item.quantity).fill(productId);

    from(units).pipe(
      concatMap(id => this.cartService.deleteFromCart(id).pipe(concatMap(() => timer(100))))
    ).subscribe({
      next: () => console.log('Product deleted'),
      complete: () => {
        this.cartElements = this.cartElements.filter(el => el.product.id !== productId);
      },
      error: err => console.error('Error:', err)
    });
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

  logOut() {
    this.auth.logout();      
    this.isAuthenticated = false;
    this.loggedOut.emit();   
   }
}
