import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../interfaces/patient.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private readonly endpoint = 'patient'; // API endpoint for patients
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(private readonly apiService: ApiService) {
    this.checkLoginStatus();
  }

  // Get all patients
  getAllPatients(): Observable<Patient[]> {
    return this.apiService.get<Patient[]>(this.endpoint);
  }

  // Get a specific patient by ID
  getPatientById(patientId: string): Observable<Patient> {
    return this.apiService.get<Patient>(`${this.endpoint}/${patientId}`);
  }

  // Update a patient
  updatePatient(patientId: string, updatedPatient: Patient): Observable<void> {
    return this.apiService.put(`patient/${patientId}`, updatedPatient);
  }
  

  // Login a patient
  loginPatient(credentials: { id: string; password: string }): Observable<any> {
    return this.apiService.post(`${this.endpoint}/login`, credentials);
  }
  
    // Call this after successful login
    setLoggedIn(status: boolean): void {
      this.isLoggedInSubject.next(status);
    }
  
    // Logout functionality
    logoutPatient(): void {
      if (this.isBrowser()) {
        sessionStorage.removeItem('patient'); // Clear session data
        localStorage.removeItem('patientToken'); // Clear token if used
      }
      this.setLoggedIn(false); // Update login state
    }
  
    // Check login status from session storage
    checkLoginStatus(): void {
      if (this.isBrowser()) {
        const patient = sessionStorage.getItem('patient');
        this.setLoggedIn(!!patient); // Update state based on session presence
      }
    }
  
    // Utility method to check if the code is running in the browser
    private isBrowser(): boolean {
      return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
    }

}
