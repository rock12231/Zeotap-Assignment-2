import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/auth'; // Backend API URL

  constructor(private http: HttpClient, private router: Router) {}

  // Login method
  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, { email, password }).pipe(
      tap((response: any) => {
        this.setSession(response.token); // Save token to local storage
      })
    );
  }

  // Register method
  register(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, { email, password });
  }

  // Forgot password method
  forgotPassword(email: string): Observable<any> {
    const url = `${this.baseUrl}/forgot-password`;
    return this.http.post(url, { email });
  }

  // Set new password (after receiving reset token via email)
  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}/reset-password`;
    return this.http.post(url, { token, newPassword });
  }

  // Logout method
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token'); // Clear token from local storage
    }
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Store token in local storage
  private setSession(token: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
    }
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      return !!token; // Returns true if token exists
    }
    return false;
  }

  // Get token for HTTP requests
  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Utility method to check if localStorage is available (window is defined)
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

}