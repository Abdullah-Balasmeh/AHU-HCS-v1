import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { LoadingImageComponent } from '../../components/shared/loading-image/loading-image.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login-user-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingImageComponent],
  templateUrl: './login-user-page.component.html',
  styleUrls: ['./login-user-page.component.css'],
})
export class LoginUserPageComponent {
  canDeactivate(): boolean {
    const shouldLogout = confirm('Are you sure you want to go back to the login page? This will log you out.');
    if (shouldLogout) {
      sessionStorage.clear();
      localStorage.removeItem('activeUserSession');
      localStorage.removeItem('activePatientSession');
    }
    return shouldLogout;
  }
  
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  visible = true; 
  changeType = true;
  private readonly destroy$ = new Subject<void>();

  loginUserForm = new FormGroup({
    userID: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(12),
      Validators.pattern(/^\d{2,12}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(26),
    ]),
  }); 
  
  validateFieldID(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();

    if (value.length < 2 || value.length > 12) {
      inputElement.setCustomValidity(
        'يرجى إدخال رقم المستخدم على أن لا يقل عن رقمان ولا يزيد عن 12 رقم'
      );
    } else {
      inputElement.setCustomValidity('');
    }
  }

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

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  togglePasswordVisibility(): void {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  onSubmit(): void {
    if (this.loginUserForm.valid) {
      this.isLoading.set(true);
      const { userID, password } = this.loginUserForm.value;
  
      if (this.isAnotherSessionActive('activeUserSession')) {
          this.isLoading.set(false);
          return;
      }
  
      this.userService
        .loginUser({ id: userID as string, password: password as string })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            const sessionToken = this.generateSessionToken();
            localStorage.setItem('activeUserSession', 'true');
            sessionStorage.setItem('user', JSON.stringify(response.user));
            sessionStorage.setItem('sessionToken', sessionToken);
  
            const userRoles = response.user.roles || [];
            const targetRoute =
              userRoles.length > 0 ? this.getRoleRoute(userRoles[0]) : '/user-pages';
  
              this.router.navigate([targetRoute], { replaceUrl: true }).then(() => {
                window.history.pushState(null, '', targetRoute);
            });
            
          },
          error: () => {
            this.errorMessage.set('رقم المستخدم أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
            this.isLoading.set(false);
          },
        });
    }
  }
  

  private isAnotherSessionActive(sessionKey: string): boolean {
    if (localStorage.getItem(sessionKey)) {
      alert("لقد قمت بالفعل بتسجيل الدخول على علامة تبويب أخرى.");
      this.isLoading.set(false);
      return true;
    }
    return false;
  }



  private getRoleRoute(role: string): string {
    const roleRoutes: { [key: string]: string } = {
      Admin: '/user-pages/admin-page',
      Manager: '/user-pages/manager-page',
      Receptionist: '/user-pages/reception-page',
      Doctor: '/user-pages/clinic-page',
      NurseM: '/user-pages/emergency-male-page',
      NurseF: '/user-pages/emergency-female-page',
      Pharmacist: '/user-pages/pharmacy-page',
    };
    return roleRoutes[role] || '/user-pages';
  }

  private generateSessionToken(): string {
    return `${Date.now()}-${Math.random()}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
