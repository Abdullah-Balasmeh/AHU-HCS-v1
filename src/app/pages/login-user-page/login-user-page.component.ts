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
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(26),
    ]),
  });

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

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

// Toggle password visibility
togglePasswordVisibility(): void {
  this.visible = !this.visible;
  this.changeType = !this.changeType;
}

onSubmit(): void {
  if (this.loginUserForm.valid) {
    this.isLoading.set(true);
    const { userID, password } = this.loginUserForm.value;

    // Prevent login if already logged in another tab
    if (localStorage.getItem('activeUserSession')) {
      alert('لقد قمت بالفعل بتسجيل الدخول على علامة تبويب أخرى.');
      this.isLoading.set(false);
      return;
    }

    this.userService
      .loginUser({ id: userID as string, password: password as string })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const sessionToken = this.generateSessionToken();
          localStorage.setItem('activeUserSession', 'true'); // Persistent session indicator
          sessionStorage.setItem('user', JSON.stringify(response.user)); // Persistent user data
          sessionStorage.setItem('sessionToken', sessionToken); // Session token (tab-specific)
          

          const userRoles = response.user.roles || [];
          const targetRoute =
            userRoles.length > 0
              ? this.getFirstRoleRoute(userRoles[0])
              : '/user-pages';

          this.router.navigate([targetRoute], { replaceUrl: true }).then(() => {
            history.replaceState({}, '', targetRoute);
          });
        },
        error: () => {
          this.errorMessage.set('يرجى تأكد من رقم المستخدم وكلمة المرور');
          this.isLoading.set(false);
        },
      });
  }
}

  private generateSessionToken(): string {
    return `${Date.now()}-${Math.random()}`;
  }

  private getFirstRoleRoute(role: string): string {
    switch (role) {
      case 'Admin':
        return '/user-pages/admin-page';
      case 'Manager':
        return '/user-pages/manager-page';
      case 'Receptionist':
        return '/user-pages/reception-page';
      case 'Doctor':
        return '/user-pages/clinic-page';
      case 'NurseM':
        return '/user-pages/emergency-male-page';
      case 'NurseF':
        return '/user-pages/emergency-female-page';
      case 'Pharmacist':
        return '/user-pages/pharmacy-page';
      default:
        return '/user-pages';
    }
  }

  // private setupSessionListener(): void {
  //   window.addEventListener('beforeunload', () => {
  //     sessionStorage.clear();
  //     localStorage.removeItem('activeUserSession');
  //   });
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
