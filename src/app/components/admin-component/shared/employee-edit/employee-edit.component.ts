import { Component, EventEmitter, Input, Output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectDropdownComponent } from '../../../shared/dropdown-menu/dropdown-menu.component';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [MultiSelectDropdownComponent, LoadingImageComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent {
  @Input() user: any = null;
  @Output() close = new EventEmitter<void>();
  @ViewChild(MultiSelectDropdownComponent) dropdown!: MultiSelectDropdownComponent;
  private readonly destroy$ = new Subject<void>();
  oldPassword='';
  restPasswordS = false;
  visible = true;
  changeType = true;
  errorMessage = '';
  successMessage = false;
  isLoading =signal<boolean>(false) ;

  EditEmpForm = new FormGroup({
    empId: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.pattern(/^\d{2,12}$/),
    ]),
    empName: new FormControl('', [Validators.required, Validators.minLength(2),Validators.pattern(/^[A-Za-z\u0621-\u064A\u0660-\u0669\s]+$/),]),
    password: new FormControl('', [Validators.minLength(4), Validators.maxLength(26)]),
    ConfirmPassword: new FormControl(''),
  });

  selectedRoles: string[] = [];

  private readonly roleMapping: { [key: string]: string } = {
    'Admin': '1',
    'Manager': '2',
    'Receptionist': '3',
    'Doctor': '4',
    'Nurse Male': '5',
    'Nurse Female': '6',
    'Pharmacist': '7',
  };

  constructor(private readonly userService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.EditEmpForm.patchValue({
        empId: this.user.userId,
        empName: this.user.userName,
      });

      // Set password only if password reset is not triggered
      if (!this.restPasswordS) {
        if (this.user && this.user.userId) {
          this.userService.getUserById(this.user.userId).subscribe({
            next: (user) => {
              this.oldPassword = user.password; // Ensure `password` exists in the response
            },
            error: (err) => {
              console.error('Error fetching user:', err); // Log error for debugging
            },
          });
        } else {
          console.error('User ID is not defined');
        }
        

      }
  
      this.selectedRoles = (this.user.roles?.map((roleName: string) => this.roleMapping[roleName]) || []);
    }
  }
  

  restPassword(): void {
    this.restPasswordS = true;
  }

  togglePasswordVisibility(): void {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  Role(selected: string[]): void {
    this.selectedRoles = selected.map(roleName => this.roleMapping[roleName]).filter(Boolean);

  }

  onSubmit(): void {
    this.isLoading.set(true) ;
    if(this.selectedRoles.length == 0 || this.EditEmpForm.invalid)
      {
        this.errorMessage ='يرجى تعبئة جميع الحقول بشكل صحيح';
        this.isLoading.set(false);
        return ;
      }
    if (this.EditEmpForm.valid) {
      const formValues = this.EditEmpForm.getRawValue();
      if (this.restPasswordS && formValues.password !== formValues.ConfirmPassword ) {
          this.errorMessage = 'كلمة المرور غير متطابقة!';
          this.isLoading.set(false);
          return;
      }
      this.errorMessage = '';
      const roleIds = this.selectedRoles.filter(Boolean);
      const request = {
        user: {
          userId: formValues.empId!,
          userName: formValues.empName!,
          password: this.restPasswordS ? formValues.password! : this.oldPassword, 
        },
        roleIds,
      };
  
      this.userService.updateUser(request.user.userId, request).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.isLoading.set(false) ;
          this.successMessage = true;
          setTimeout(() => (this.successMessage = false), 2000);
          setTimeout(() => (this.closeDialog()), 2000);
        },
        error: () => {
          this.isLoading.set(false) ;
          this.errorMessage = 'يرجى تعبئة جميع حقول كلمة المرور بشكل صحيح';
        },
      });
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  closeDialog(): void {
    this.close.emit();
  }
}
