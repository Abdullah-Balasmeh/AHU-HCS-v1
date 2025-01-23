import { TraineeService } from './../../../../services/trainee.service';
import { Trainee } from './../../../../interfaces/trainee.interface';
import { Component, inject } from '@angular/core';
import { DropdownListComponent } from "../../../shared/dropdown-list/dropdown-list.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../../../interfaces/student.interface';
import { StudentService } from '../../../../services/student.service';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-rigest-trainee-form',
  standalone: true,
  imports: [DropdownListComponent, ReactiveFormsModule, LoadingImageComponent,CommonModule],
  templateUrl: './manager-rigest-trainee-form.component.html',
  styleUrl: './manager-rigest-trainee-form.component.css'
})
export class ManagerRigestTraineeFormComponent {
private readonly studentService=inject(StudentService);
private readonly traineeService=inject(TraineeService);
  hasData=false;
  isLoading=false;
  registTraineeForm=new FormGroup({
    TraineeId: new FormControl(),
    TraineeName: new FormControl(),
    TraineeMajor: new FormControl(),
    TraineeCollege: new FormControl(),
    supervisorName: new FormControl(),
  });
  student: Student | null = null; 
  subject:string='';
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
  searchStud()
  {
    if(!this.registTraineeForm.value.TraineeId)
      {
        alert('يرجى إدخال رقم الطالب');
        return;
      }
      this.studentService.getStudentById(this.registTraineeForm.value.TraineeId).subscribe({
        next: (data) => {
          this.student = data;
          this.registTraineeForm.patchValue({
            TraineeName:this.student.studentName,
            TraineeCollege:this.student.college,
            TraineeMajor:this.student.major,
          });
          this.hasData=true;

        },
        error: (err) => {
          console.error(err)
          this.student = null; // Clear any previous data
        },
      });
  }
  course(selected: string): void {
    this.subject = selected;
  }

onSubmit()
{
  sessionStorage.getItem('user');
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  this.isLoading=true;
const newTrainee:Trainee={
    traineeId:this.student?.studentId!,
    traineeName:this.student?.studentName!,
    supervisor:this.registTraineeForm.value.supervisorName,
    password:this.student?.password!,
    course:this.subject,
    registDate:new Date(),
    userName:user.userName,
  };
this.traineeService.addTrainee(newTrainee).subscribe({
  next:()=>
  {
    this.student = null; 
    this.hasData=false;
    this.isLoading=false;
    this.registTraineeForm.reset();
    alert('تم تسجيل المتدرب بنجاح');
  },
  error:()=>alert('هذه الطالب متدرب بالفعل'),
});

}

}
