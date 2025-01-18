import { VaccCertificatService } from './../../../services/vacc-certificat.service';

import { Student } from './../../../interfaces/student.interface';
import { StudentService } from './../../../services/student.service';
import { Component, inject, Input } from '@angular/core';
import { Patient, } from '../../../interfaces/patient.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Report } from '../../../interfaces/report.interface';
import { VaccDipen } from '../../../interfaces/VaccCertificat.inertface';
import { ReportsService } from '../../../services/report.service';
import { DropdownListComponent } from "../../shared/dropdown-list/dropdown-list.component";
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";

@Component({
  selector: 'app-report-section',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownListComponent, LoadingImageComponent],
  templateUrl: './report-section.component.html',
  styleUrl: './report-section.component.css'
})
export class ReportSectionComponent {
  private readonly studentService=inject(StudentService);
  private readonly reportsService=inject(ReportsService);
  private readonly VaccCertificatService=inject(VaccCertificatService);
  student:Student | null=null;
  @Input() patient:Patient={}
  @Input() enterDate:string='';
  selectedReport: string = '';
  isLoading=false;
  selectedClinic:string=''
report:Report={};
vacIssue: VaccDipen={};
clinics: string[] = [
  'عيادة الأسنان',
  'عيادة الأعصاب',
  'عيادة الباطنية',
  'عيادة الأطفال',
  'عيادة العيون',
  'عيادة الأنف والأذن والحنجرة',
  'عيادة العظام',
  'عيادة الجلدية',
  'عيادة النساء والتوليد',
  'عيادة القلب والشرايين',
  'عيادة الجراحة العامة',
  'عيادة الطب النفسي',
  'عيادة أمراض السكري',
  'عيادة العلاج الطبيعي',
  'عيادة أمراض الدم',
  'عيادة الأورام',
  'عيادة الصدرية والتنفس',
  'عيادة التغذية',
];
reportForm=new FormGroup({
  decription:new FormControl(''),
  recommendation:new FormControl(''),
})

selectReport(selected:string)
{
  this.selectedReport=selected;
}
selectClinic(selected:string)
{
  this.selectedClinic=selected;
}

onSave()
{
  if(!this.selectedReport)
    {
      alert('يرجى اختيار تقرير');
      return;
    }
  this.isLoading=true;
  const user = sessionStorage.getItem('user');
  const parsedUser = user ? JSON.parse(user) : null;
  if(this.selectedReport!='صرف مطعوم الكبد الوبائي (B)')
    {
      this.report={
        reportType:this.selectedReport,
        patientId:this.patient.patientId,
        patientName:this.patient.patientName!,
        date:this.enterDate,
        enterTime:this.enterDate,
        leaveTime:new Date(),
        doctorName:parsedUser.userName,
        recommendation:this.reportForm.value.recommendation ?? '',
        description:this.reportForm.value.decription ?? '',
        hospitalName:(this.selectedReport=='تحويل' ? 'مستشفى معان الحكومي' : ''),
        clinicName:this.selectedClinic ?? ''
      }
      console.log(this.report);
      this.reportsService.addReport(this.report).subscribe({
        next:()=>{
          this.isLoading=false;
          alert('success save');
          this.reportForm.reset();
          this.selectedReport='';
          this.selectedClinic='';
        },
        error:(err)=>{
          this.isLoading=false;
          alert(`${err}`);
        },
      });
    }else {
      this.studentService.getStudentById(this.patient.patientId!).subscribe({
        next: (student) => {
          this.student = student;
    
          // Create vacIssue after student is retrieved
          const vacIssue :VaccDipen= {
            reportType:'صرف مطعوم الكبد الوبائي (B)',
            studentId: this.patient.patientId,
            studentName: this.patient.patientName!,
            college: this.student.college,
            major: this.student.major,    
            date: this.enterDate,
            enterTime:this.enterDate,
            leaveTime:new Date(),
            dose:'Vial 1.0 ml',
            doctorName: parsedUser.userName,
          };
    
          // Log and add vacIssue after student data is ready
          console.log(this.vacIssue);
          this.VaccCertificatService.addVaccDipen(vacIssue).subscribe({
            next: () => {
              this.isLoading = false;
              this.reportForm.reset();
              this.selectedReport='';
              this.selectedClinic='';
              alert('success save');
            },
            error: (err) => alert(`${err}`),
          });
        },
        error: (err) => {
          this.isLoading = false;
          alert(`Error retrieving student: ${err}`);
        },
      });
    }
    
}



}
