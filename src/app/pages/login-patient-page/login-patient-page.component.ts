import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { LoadingImageComponent } from '../../components/shared/loading-image/loading-image.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login-patient-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingImageComponent],
  templateUrl: './login-patient-page.component.html',
  styleUrls: ['./login-patient-page.component.css'],
})
export class LoginPatientPageComponent {


  errorMessage = signal<string>(''); // Reactive error message
  isLoading = signal<boolean>(false); // Reactive loading state
  visible = true; 
  changeType = true;
  private readonly destroy$ = new Subject<void>();

  loginPatientForm = new FormGroup({
    patientID: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(12),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(26),
    ]),
  });
 // Validate patient ID field
validateFieldID(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value.trim();

  if (value.length < 2 || value.length > 12) {
    inputElement.setCustomValidity(
      'يرجى إدخال رقم المريض على أن لا يقل عن رقمان ولا يزيد عن 12 رقم'
    );
  } else {
    inputElement.setCustomValidity('');
  }
}

// Validate password field
validateFieldPassword(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value.trim();

  if (value.length < 4 || value.length > 26) {
    inputElement.setCustomValidity(
      'يرجى إدخال كلمة المرور على أن لا تقل عن 4 خانات ولا تزيد عن 26 خانة'
    );
  } else {
    inputElement.setCustomValidity('');
  }
}
  private readonly patientService = inject(PatientService);
  private readonly router = inject(Router);

  // Toggle password visibility

  togglePasswordVisibility(): void {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.loginPatientForm.valid) {
      this.isLoading.set(true);
      const { patientID, password } = this.loginPatientForm.value;

      if (this.isAnotherSessionActive('activePatientSession')) {
        return;
      }

      this.patientService
      .loginPatient({ id: patientID as string, password: password as string })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const sessionToken = this.generateSessionToken();
          localStorage.setItem('activePatientSession', 'true');
          sessionStorage.setItem('patient', JSON.stringify(response));
          sessionStorage.setItem('sessionToken', sessionToken);
    
          // Navigate to the patient page and replace the login page in history
          this.router.navigate(['/patient-page'], { replaceUrl: true }).then(() => {
            window.history.pushState(null, '', '/patient-page');
        });
        
        },
        error: () => {
          this.errorMessage.set('Invalid patient ID or password. Please try again.');
          this.isLoading.set(false);
        },
      });
    
    
    }
  }

  private isAnotherSessionActive(sessionKey: string): boolean {
    if (localStorage.getItem(sessionKey)) {
      alert('You are already logged in on another tab.');
      this.isLoading.set(false);
      return true;
    }
    return false;
  }



  private generateSessionToken(): string {
    return `${Date.now()}-${Math.random()}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
