import { MedicalRecordService } from './../../../services/medical-record.service';
import { PatientService } from './../../../services/patient.service';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-regist',
  standalone: true,
  imports: [LoadingImageComponent ,ReactiveFormsModule,CommonModule],
  templateUrl: './patient-regist.component.html',
  styleUrl: './patient-regist.component.css'
})
export class PatientRegistComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly patientService=inject(PatientService);
  private readonly medicalRecordService=inject(MedicalRecordService)
  regist = signal(false);
  search = signal(false);
  success = signal(false);
  errorMessage = '';
  error = false;
  patientState=false;

  registForm = new FormGroup({
    patientId: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/)]),
    patientName: new FormControl('', Validators.required),
    patientType: new FormControl('عيادة', Validators.required),
  });

  checkPatient(){
    if (this.search()) return;
    const patientId = this.registForm.get('patientId')?.value;
    this.search.set(true);
    if(!patientId)
      {
        this.setError('يرجى إدخال رقم الطالب أو الموظف');
        this.search.set(false);
      }
    const subscription= this.patientService.getPatientById(patientId!).subscribe(
          {
            next:(patient)=>{
              this.search.set(false);
              this.clearError();
              this.registForm.patchValue({
                patientName: patient.patientName,
              });
              if(patient.patientClass=='طالب' ){
                this.checkStudent(patient.patientId!);
              }else{
                this.checkEmployee(patient.patientId!);
              }
            },
            error:()=>{
              this.setError('الطالب أو الموظف غير موجود');
              this.search.set(false);
            }
          }
        )
        this.destroyRef.onDestroy(() => subscription.unsubscribe());
  };
  private setError(message: string) {
    this.error = true;
    this.errorMessage = message;
  }

  private clearError() {
    this.error = false;
    this.errorMessage = '';
  }

  private checkStudent(studentId : string)
  {
    const subscription= this.medicalRecordService.getStudentState(studentId).subscribe({
      next:(student)=>{
        if(student.studentState == '1')
          {
            this.patientState=true;
            const alertMessage ='هذا الطالب مؤجل ولا يمكن تسجيله';
            alert(alertMessage);
          }
      }
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  private checkEmployee(empId : string)
  {
    const subscription= this.medicalRecordService.getEmployeeState(empId).subscribe({
      next:(emp)=>{
        if(emp.employeeState == '1')
          {
            const alertMessage ='هذا الموظف ليس على رأس عمله';
            alert(alertMessage);
          }
      }
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit():void{
    this.regist.set(true);
    if (this.registForm.invalid) {
      this.setError('يرجى إدخال رقم المريض/ة بشكل صحيح');
      return;
    }
    if(this.patientState){
      const alertMessage ='هذا الطالب مؤجل ولا يمكن تسجيله';
      alert(alertMessage);
      this.resetForm();
      return;
    }
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(new Date());
    const user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    const medicalRecord = {
      userId:parsedUser.userId,
      patientId: this.registForm.get('patientId')?.value,
      patientType: this.registForm.get('patientType')?.value,
      enterDate: new Date(),
    };
    const subscription =this.medicalRecordService.addMedicalRecord(medicalRecord).subscribe({
      next:(response)=>{
        console.log('Success response:', response);
        this.success.set(true);
        this.resetForm();
      },
      error: (error) =>{
        console.error('Error response:', error);
        alert('حدث خطأ أثناء إضافة المريض');
        this.resetForm();
      }
        
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private resetForm() {
    this.regist.set(false);
    this.registForm.reset({
      patientId: '',
      patientName: '',
      patientType: 'عيادة',
    });
    this.patientState=false;
    this.clearError();
    setTimeout(() => this.success.set(false), 2000);
  }
  
}
