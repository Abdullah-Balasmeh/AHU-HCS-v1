import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginPatientService {
  private readonly http = inject(HttpClient);
  private readonly authEndpoint = 'http://localhost:3000/patients'; // Replace with your actual login endpoint

  // Signal to manage the loading state
  isLoading = signal<boolean>(false);

  constructor() {}

  // Perform login with userID and password
  login(userID: string, password: string): Observable<{ token: string }> {
    this.isLoading.set(true);

    return this.http
      .post<{ token: string }>(
        `${this.authEndpoint}/login`,
        { userID, password },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(
        catchError((error) => {
          this.isLoading.set(false);
          return throwError(() => new Error('حدث خطأ يرجى المحاولة مرة أخرى'));
        })
      );
  }

  // Logout logic
  logout(): void {
    // Perform logout actions like clearing tokens
    localStorage.removeItem('authToken');
  }
}
