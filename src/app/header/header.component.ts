import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showCart = false
  active = "active"
  
  constructor(public auth: AuthService, private router: Router) {}

  toggleCart() {
    if (this.auth.isAuthenticated()) {   
        this.showCart = !this.showCart;
      } else {
        this.router.navigate(['/login']); 
      }  
    }
}
