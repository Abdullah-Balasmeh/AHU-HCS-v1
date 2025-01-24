import { VaccCertificatService } from '../../../../../services/vacc-certificat.service';
import { Component, inject } from '@angular/core';
import { DropdownListComponent } from "../../../../shared/dropdown-list/dropdown-list.component";
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../../../../interfaces/student.interface';
import { StudentService } from '../../../../../services/student.service';
import { VaccCertificat } from '../../../../../interfaces/VaccCertificat.inertface';
import { Subject, takeUntil } from 'rxjs';
import { LoadingImageComponent } from "../../../../shared/loading-image/loading-image.component";


@Component({
  selector: 'app-certificate-regist',
  standalone: true,
  imports: [DropdownListComponent, CommonModule, ReactiveFormsModule, LoadingImageComponent],
  templateUrl: './certificate-regist.component.html',
  styleUrl: './certificate-regist.component.css'
})
export class CertificateRegistComponent {
  private readonly destroy$ = new Subject<void>();
private readonly studentService=inject(StudentService);
private readonly vaccCertificatService=inject(VaccCertificatService);

  hasData=false;
  isLoading=false;
  certificateForm=new FormGroup({
    studentId: new FormControl(),
    studentName: new FormControl(),
    studentMajor: new FormControl(),
    studentCollege: new FormControl(),
  });
  student: Student | null = null; 
dose:string='';

  doseSelect(selected: string): void {
    this.dose = selected;
  }
searchStud()
  {
    if(!this.certificateForm.value.studentId)
      {
        alert('يرجى إدخال رقم الطالب');
        return;
      }
      this.studentService.getStudentById(this.certificateForm.value.studentId).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.student = data;
          this.certificateForm.patchValue({
            studentName:this.student.studentName,
            studentCollege:this.student.college,
            studentMajor:this.student.major,
          });
          this.hasData=true;

        },
        error: () => {
          alert('هذا الطالب غير موجود');
          this.student = null;
        },
      });
  }

  release()
  {
    this.isLoading=true;
    if(!this.certificateForm.value.studentId)
      {
        this.isLoading=false;
        alert('يرجى تعبئة حقل رقم الطالب');
        return;
      }
    if(this.certificateForm.invalid || this.dose=='')
      {
        this.isLoading=false;
        alert('يرجى تعبئة جميع الحقول بشكل صحيح');
        return;
      }
    const user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    const newCertificate:VaccCertificat={
      managerName:parsedUser.userName,
      reportType:'شهادة مطعوم الكبد الوبائي (B)',
      studentId:this.student?.studentId!,
      studentName:this.student?.studentName,
      college:this.student?.college,
      major:this.student?.major,
      dose:this.dose,
      enterTime:new Date(),
      leaveTime:new Date(),
      date:new Date(),
    }
    this.vaccCertificatService.addVaccCertificat(newCertificate).pipe(takeUntil(this.destroy$)).subscribe({
      next:()=>{
        this.isLoading=false;
        alert('شهادة مطعوم الكبد الوبائي (B) تم إضافة');
        this.certificateForm.reset();
      },
      error:()=>alert('حدث خطأ أثناء الإضافة'),
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
