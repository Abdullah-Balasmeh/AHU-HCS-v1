import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TraineeService } from './../../../../services/trainee.service';
import { StudentService } from '../../../../services/student.service';
import { DropdownListComponent } from '../../../shared/dropdown-list/dropdown-list.component';
import { LoadingImageComponent } from '../../../shared/loading-image/loading-image.component';
import { Student } from '../../../../interfaces/student.interface';
import { Trainee } from './../../../../interfaces/trainee.interface';

@Component({
  selector: 'app-manager-rigest-trainee-form',
  standalone: true,
  imports: [DropdownListComponent, ReactiveFormsModule, LoadingImageComponent, CommonModule],
  templateUrl: './manager-rigest-trainee-form.component.html',
  styleUrls: ['./manager-rigest-trainee-form.component.css']
})
export class ManagerRigestTraineeFormComponent {
  private readonly destroy$ = new Subject<void>();
  private readonly studentService = inject(StudentService);
  private readonly traineeService = inject(TraineeService);

  hasData = signal(false);
  isLoading = false;
  isExits = false;
  student: Student | null = null;
  subject: string = '';

  registTraineeForm = new FormGroup({
    TraineeId: new FormControl('', [Validators.required]),
    TraineeName: new FormControl({ value: '', disabled: true }),
    TraineeMajor: new FormControl({ value: '', disabled: true }),
    TraineeCollege: new FormControl({ value: '', disabled: true }),
    supervisorName: new FormControl('', [Validators.required]),
  });

  items: string[] = [
    'تمريض صحة البالغين سريري 1',
    'تمريض صحة البالغين سريري 2',
    'تمريض صحة الأم سريري',
    'تمريض صحة الطفل سريري',
    'تمريض الصحة النفسية سريري',
    'تمريض الرعاية الحثيثة و الطوارئ سريري',
    'التدريب السريري المكثف',
    'تدريب مخبري 1',
    'التدريب الميداني 1',
    'التدريب الميداني 2',
    'التدريب الميداني 3',
    'التدريب الميداني 4',
  ];

  searchStud(): void {
    if (!this.registTraineeForm.value.TraineeId) {
      alert('يرجى إدخال رقم الطالب');
      return;
    }

    this.studentService.getStudentById(this.registTraineeForm.value.TraineeId)
      .subscribe({
        next: (data) => {
          if(data.studentState=='1'){
            alert("هذا الطالب مؤجل");
            return;
          }
          this.student = data;
          this.registTraineeForm.patchValue({
            TraineeName: this.student.studentName,
            TraineeCollege: this.student.college,
            TraineeMajor: this.student.major,
          });
          this.hasData.set(true);
        },
        error: (err) => {
          console.error(err);
          alert('الطالب غير موجود');
          this.student = null;
          this.hasData.set(false);
        },
      });
  }

  course(selected: string): void {
    this.subject = selected;
  }

  onSubmit(): void {
    this.isLoading = true;

    if (this.registTraineeForm.invalid || !this.subject) {
      this.isLoading = false;
      alert('يرجى تعبئة جميع الحقول بشكل صحيح');
      return;
    }

    const user = JSON.parse(sessionStorage.getItem('user') ?? '{}');

    this.traineeService.getTraineeById(this.student?.studentId!)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (trainee) => {
        if (trainee.traineeId === this.student?.studentId!) {
          alert('هذا الطالب متدرب بالفعل');
          this.resetForm();
          this.isExits = true;
        } 
      },
      error:()=> this.registerNewTrainee(user),
    });
  
  }

  private registerNewTrainee(user: any): void {
    if (!this.isExits) {
      const newTrainee: Trainee = {
        traineeId: this.student?.studentId!,
        traineeName: this.student?.studentName!,
        supervisor: this.registTraineeForm.value.supervisorName!,
        password: this.student?.password!,
        course: this.subject,
        registDate: new Date(),
        userName: user.userName,
      };

      this.traineeService.addTrainee(newTrainee)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            alert('تم تسجيل المتدرب بنجاح');
            console.log('newTrainee',newTrainee)
            this.resetForm();
          },
          error: (err) => {
            console.error(err)
            alert('حدث خطأ أثناء إضافة المتدرب');
            this.isLoading = false;
          },
        });
    }
  }

  private resetForm(): void {
    this.student = null;
    this.hasData.set(false);
    this.isLoading = false;
    this.registTraineeForm.reset();
    this.subject = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
