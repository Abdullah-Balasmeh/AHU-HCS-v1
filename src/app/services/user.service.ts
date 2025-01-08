import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly endpoint = 'users'; // API endpoint for users
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private readonly apiService: ApiService) {
    this.checkLoginStatus();
  }

  // Login user
  loginUser(credentials: { id: string; password: string }): Observable<{ token: string; user: User }> {
    return this.apiService.post<{ token: string; user: User }>(`${this.endpoint}/login`, credentials);
  }
  
  

  // Set login status after successful login
  setLoggedIn(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  // Logout user
  logoutUser(): void {
    sessionStorage.removeItem('user');
    localStorage.removeItem('activeUserSession');
  }
  

  // Check login status from session storage
  checkLoginStatus(): void {
    if (this.isBrowser()) {
      const user = sessionStorage.getItem('user');
      this.setLoggedIn(!!user); // Update state based on session presence
    }
  }

  // Utility method to check if the code is running in the browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }
}
