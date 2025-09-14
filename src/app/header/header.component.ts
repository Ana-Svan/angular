import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CartComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showCart = false;           
  isAuthenticated = false;   
  active = 'active';

  constructor(public auth: AuthService) {}

  toggleCart() {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.showCart = true;
    console.log('showCart', this.showCart, 'isAuthenticated', this.isAuthenticated);
    }

  onLoginSuccess() {
    this.isAuthenticated = true;
  }
}
