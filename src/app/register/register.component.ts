import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  phoneNumber = '';
  errorMessage = '';

  @Output() registered = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();

  onBackToLogin() {
      this.switchToLogin.emit();
  }

  onSubmit() {
    const body = {
      phoneNumber: this.phoneNumber,
      password: this.password,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    };

    console.log(body);

   fetch("https://rentcar.stepprojects.ge/api/Users/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(resp => {
       if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      return resp.text();
    })
    .then(data => {
      console.log("User registered");
      this.registered.emit();
    })
     .catch(err => {
      console.error('Error:', err);
      this.errorMessage = 'Error registering user. Please check your data.';
    });
  }
}