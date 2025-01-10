import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, signal, ViewChild } from '@angular/core';
import { MultiSelectDropdownComponent } from '../../../shared/dropdown-menu/dropdown-menu.component';
import { User } from '../../../../interfaces/users.interface';
import { LoadingImageComponent } from '../../../shared/loading-image/loading-image.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-employee-regist',
  standalone: true,
  imports: [MultiSelectDropdownComponent, ReactiveFormsModule, LoadingImageComponent, CommonModule],
  templateUrl: './employee-regist.component.html',
  styleUrls: ['./employee-regist.component.css']
})
export class EmployeeRegistComponent {
  private readonly user: User | null = null;
  @ViewChild(MultiSelectDropdownComponent) dropdown!: MultiSelectDropdownComponent;

  visible = true;
  changeType = true;
  errorMessage = signal<string>('');
  successMessage= signal<boolean>(false);
  isLoading = signal<boolean>(false);

  registEmpForm = new FormGroup({
    empName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    empId: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{2,12}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(26),
    ]),
    ConfirmPassword: new FormControl('', [Validators.required]),
  });


  constructor(private readonly userService: UserService) {}
  private readonly roleMapping: { [key: string]: string } = {
    'Admin': '1',
    'Manager': '2',
    'Receptionist': '3',
    'Doctor': '4',
    'Nurse Male': '5',
    'Nurse Female': '6',
    'Pharmacist': '7',
  };
  
  
  selectedRoles: string[] = [];
  
  Role(selected: string[]): void {
    this.selectedRoles = selected.map(roleName => this.roleMapping[roleName]);
  }
  


  validateFieldID(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();

    if (value.length < 2 || value.length > 12) {
      inputElement.setCustomValidity(
        'يرجى إدخال الرقم الوظيفي على أن لا يقل عن رقمان ولا يزيد عن 12 رقم'
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

  togglePasswordVisibility(): void {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.registEmpForm.valid) {
      const formValues = this.registEmpForm.value;
  
      if (formValues.password !== formValues.ConfirmPassword) {
        this.errorMessage.set('كلمة المرور غير متطابقة!');
        return;
      }
  
      const request = {
        user: {
          userName: formValues.empName!,
          userId: formValues.empId!,
          password: formValues.password!,
          createDate: new Date(),
        },
        roleIds: this.selectedRoles,
      };
  
      this.isLoading.set(true);
  
      this.userService.addUser(request).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.successMessage.set(true);
          this.registEmpForm.reset();
          setTimeout(() => this.successMessage.set(false), 2000);
          this.selectedRoles = [];
          this.dropdown.reset();
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(`Error adding user: ${err.message}`);
        },
      });
    } else {
      this.errorMessage.set('يرجى تعبئة جميع الحقول بشكل صحيح');
    }

  }
  
  
}  
