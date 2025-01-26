import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, signal, ViewChild } from '@angular/core';
import { MultiSelectDropdownComponent } from '../../../shared/dropdown-menu/dropdown-menu.component';
import { LoadingImageComponent } from '../../../shared/loading-image/loading-image.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-regist',
  standalone: true,
  imports: [MultiSelectDropdownComponent, ReactiveFormsModule, LoadingImageComponent, CommonModule],
  templateUrl: './employee-regist.component.html',
  styleUrls: ['./employee-regist.component.css']
})
export class EmployeeRegistComponent {
  @ViewChild(MultiSelectDropdownComponent) dropdown!: MultiSelectDropdownComponent;
  private readonly destroy$ = new Subject<void>();
  visible = true;
  changeType = true;
  errorMessage = signal<string>('');
  successMessage= signal<boolean>(false);
  isLoading = signal<boolean>(false);
  isExist=false;
  registEmpForm = new FormGroup({
    empName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z\u0621-\u064A\u0660-\u0669\s]+$/),]),
    empId: new FormControl('', [
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
    ConfirmPassword: new FormControl('', [
      Validators.required ,
      Validators.minLength(4),
      Validators.maxLength(26),]),
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
        'يرجى إدخال رقم الوظيفي على أن لا يقل عن رقمان ولا يزيد عن 12 رقم'
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
    this.isLoading.set(true);
    if(this.selectedRoles.length == 0 || this.registEmpForm.invalid)
      {
        this.errorMessage.set('يرجى تعبئة جميع الحقول بشكل صحيح');
        this.isLoading.set(false);
        return ;
      }
      const formValues = this.registEmpForm.value;
      if (formValues.password !== formValues.ConfirmPassword) {
        this.errorMessage.set('كلمة المرور غير متطابقة!');
        this.isLoading.set(false);
        return;
      }

          const request = {
            user: {
              userName: formValues.empName!,
              userId: formValues.empId!,
              password: formValues.password!,
              salt:'',
              createDate: new Date().toISOString(),
            },
            roles: this.selectedRoles,
          };
          this.userService.getUserById(formValues.empId!).pipe(takeUntil(this.destroy$)).subscribe({
            next:(user)=>{
              if(user.userId==formValues.empId)
                {
                  this.isLoading.set(false);
                  alert('رقم الموظف بالفعل موجود');
                  this.registEmpForm.reset();
                  this.errorMessage.set('');
                  this.selectedRoles = [];
                  this.isExist=true;
                  this.dropdown.reset();
                  return;
                }
            },
          });
          if(!this.isExist)
            {
              this.userService.addUser(request).pipe(takeUntil(this.destroy$)).subscribe({
                next: () => {
                  this.errorMessage.set('');
                  this.isLoading.set(false);
                  this.successMessage.set(true);
                  this.registEmpForm.reset();
                  setTimeout(() => this.successMessage.set(false), 2000);
                  this.selectedRoles = [];
                  this.dropdown.reset();
                },
                error: () => {
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
