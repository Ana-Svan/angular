import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://rentcar.stepprojects.ge/api/Users/login';
  
  isAuthenticated = signal<boolean>(false);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.isAuthenticated.set(!!token);
  }

  login(credentials: { phoneNumber: string; password: string }) {
    return this.http.post<{ token: string }>(this.apiUrl, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.isAuthenticated.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
