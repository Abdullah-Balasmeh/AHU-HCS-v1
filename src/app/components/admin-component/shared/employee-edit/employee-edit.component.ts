import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectDropdownComponent } from '../../../shared/dropdown-menu/dropdown-menu.component';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';

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

  restPasswordS = false;
  visible = true;
  changeType = true;
  errorMessage = '';
  successMessage = false;
  isLoading = false;

  EditEmpForm = new FormGroup({
    empId: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.pattern(/^\d{2,12}$/),
    ]),
    empName: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
        password:this.EditEmpForm.value?.password || this.user.password ,
      });
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
    console.log('Selected Roles:', this.selectedRoles); // Debug selectedRoles
  }

  onSubmit(): void {
    if (this.EditEmpForm.valid) {
      const formValues = this.EditEmpForm.getRawValue();

      // Check for password mismatch
      if (this.restPasswordS && formValues.password !== formValues.ConfirmPassword) {
        this.errorMessage = 'كلمة المرور غير متطابقة!';
        return;
      }

      const roleIds = this.selectedRoles.filter(Boolean); // Ensure no undefined values
      console.log('Role IDs:', roleIds); // Debug roleIds

      const request = {
        user: {
          userId: formValues.empId!,
          userName: formValues.empName!,
          password:  formValues.password || this.user.password!, // Only update password if reset
        },
        roleIds,
      };

      console.log('Request:', request); // Debug request

      this.isLoading = true;

      this.userService.updateUser(request.user.userId, request).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = true;
          setTimeout(() => (this.successMessage = false), 2000);
          this.closeDialog();
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = `Error updating user: ${err.message}`;
        },
      });
    } else {
      this.errorMessage = 'يرجى تعبئة جميع الحقول بشكل صحيح';
    }
  }

  closeDialog(): void {
    this.close.emit();
  }
}
