import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MedicalRecordService } from './../../../services/medical-record.service';
import { PatientService } from './../../../services/patient.service';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-patient-regist',
  standalone: true,
  imports: [LoadingImageComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './patient-regist.component.html',
  styleUrl: './patient-regist.component.css'
})
export class PatientRegistComponent {
  private readonly destroy$ = new Subject<void>();
  private readonly patientService = inject(PatientService);
  private readonly medicalRecordService = inject(MedicalRecordService)
  regist = signal(false);
  search = signal(false);
  success = signal(false);
  errorMessage = '';
  error = false;
  patientState = false;
  patientId: string = '';
  registForm = new FormGroup({
    patientId: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/)]),
    patientName: new FormControl('', Validators.required),
    patientType: new FormControl('عيادة', Validators.required),
  });

  checkPatient() {
    const patientId = this.registForm.get('patientId')?.value;
    this.search.set(true);
    if (!patientId) {
      this.setError('يرجى إدخال رقم الطالب أو الموظف');
      this.search.set(false);
      return;
    }
    this.patientService.getPatientById(patientId).pipe(takeUntil(this.destroy$)).subscribe(
      {
        next: (patient) => {
          this.search.set(false);
          this.clearError();
          this.registForm.patchValue({
            patientName: patient.patientName,
          });
          if (patient.patientClass == 'طالب') {
            this.checkStudent(patient.patientId!);
          } else {
            this.checkEmployee(patient.patientId!);
          }
        },
        error: () => {
          this.setError('الطالب أو الموظف غير موجود');
          this.search.set(false);
        }
      }
    )
  };
  private setError(message: string) {
    this.error = true;
    this.errorMessage = message;
  }

  private clearError() {
    this.error = false;
    this.errorMessage = '';
  }

  private checkStudent(studentId: string) {
  this.medicalRecordService.getStudentState(studentId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (student) => {
        if (student.studentState == '1') {
          this.patientState = true;
          const alertMessage = 'هذا الطالب مؤجل ولا يمكن تسجيله';
          alert(alertMessage);
        }
      }
    })
  }
  private checkEmployee(empId: string) {
    this.medicalRecordService.getEmployeeState(empId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (emp) => {
        if (emp.employeeState == '1') {
          const alertMessage = 'هذا الموظف ليس على رأس عمله';
          alert(alertMessage);
        }
      }
    })
  }
  getLocalDate = (): string => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};
  onSubmit(): void {
    this.regist.set(true);
    if (this.registForm.invalid) {
      this.setError('يرجى إدخال رقم المريض/ة بشكل صحيح أو النقر على زر البحث');
      this.regist.set(false);
      return;
    }
    if (this.patientState) {
      const alertMessage = 'هذا الطالب مؤجل ولا يمكن تسجيله';
      alert(alertMessage);
      this.resetForm();
      return;
    }

    const patientId = this.registForm.get('patientId')?.value;
    const today=this.getLocalDate();
    this.medicalRecordService.getRecordsByPatientId(patientId!).subscribe({
        next: (records) => {
          const todayRecords = records.filter((record: any) => {
            const recordDate = record.enterDate.split('T')[0]; 
            return recordDate === today.split('T')[0];
          });
            if (todayRecords.length >= 3) {
                alert('لا يمكن للمريض إن يكون له أكثر من 3 سجلات طبية في يوم واحد.');
                this.regist.set(false);
                return;
            }
            const user = JSON.parse(sessionStorage.getItem('user') ?? '{}');
            const medicalRecord = {
                userId: user.userId,
                patientId,
                patientType: this.registForm.get('patientType')?.value,
                enterDate: new Date().toISOString(),
            };
            this.medicalRecordService.addMedicalRecord(medicalRecord).pipe(takeUntil(this.destroy$)).subscribe({
                next: () => {
                    this.success.set(true);
                    this.resetForm();
                },
                error: () => {
                    alert('حدث خطأ أثناء إضافة المريض');
                    this.resetForm();
                },
            });
        },
        error: () => alert('حدث خطأ أثناء جلب السجلات'),
    });
  
  }

  private resetForm() {
    this.regist.set(false);
    this.registForm.reset({
      patientId: '',
      patientName: '',
      patientType: 'عيادة',
    });
    this.patientState = false;
    this.clearError();
    setTimeout(() => this.success.set(false), 2000);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
