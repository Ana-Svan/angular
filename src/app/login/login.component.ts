import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  @Output() loggedIn = new EventEmitter<void>();
  @Output() switchToRegister = new EventEmitter<void>();

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login({ phoneNumber: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('Login succesfully:', res);
        this.loggedIn.emit();
      },
      error: () => {
        this.errorMessage = 'Error login';
      }
    });
  }

  goToRegister() {
    this.switchToRegister.emit();
  }
}
