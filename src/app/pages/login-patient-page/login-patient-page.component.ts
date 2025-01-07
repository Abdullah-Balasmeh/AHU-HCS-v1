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
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
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

  private readonly patientService = inject(PatientService);
  private readonly router = inject(Router);
  // Validate user ID field
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

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  onSubmit(): void {
    if (this.loginPatientForm.valid) {
      this.isLoading.set(true);
      const { patientID, password } = this.loginPatientForm.value;
      this.patientService
        .loginPatient({ id: patientID as string, password: password as string }).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            sessionStorage.setItem('patient', JSON.stringify(response));
            this.router.navigate(['/patient-page']); // Navigate to patient page on success
          },
          error: (err) => {
            this.errorMessage.set('يرجى تأكد من رقم المستخدم أو كلمة المرور') ;
            this.isLoading.set(false);
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
