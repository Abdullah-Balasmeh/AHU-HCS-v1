import { VaccCertificatService } from './../../../services/vacc-certificat.service';
import { ReportsService } from './../../../services/report.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { Patient } from '../../../interfaces/patient.interface';
import { Report } from '../../../interfaces/report.interface';
import { VaccCertificat, VaccDipen } from '../../../interfaces/VaccCertificat.inertface';
import { PDF } from '../../../services/pdf.service';

@Component({
  selector: 'app-patient-report-table',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule],
  templateUrl: './patient-report-table.component.html',
  styleUrls: ['./patient-report-table.component.css']
})
export class PatientReportTableComponent implements OnInit {
  ngOnInit(): void {
    this.loadAllData();
  }

  private readonly ReportsService = inject(ReportsService);
  private readonly VaccCertificatService = inject(VaccCertificatService);
  private readonly PDF = inject(PDF);

  @Input() patient: Patient | null = null;
  reports: Report[] = [];
  vacIssues: VaccDipen[] = [];
  vaccCertificate: VaccCertificat[] = [];
  allReportsAndCertificateAndVacIssues: any[] = [];
  isLoading = false;
  typeOfReports='';
  formatDay(dateString: Date | string) {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('ar-EG', { weekday: 'long' });
  }

  formatTime(dateString: Date | string) {
    const dateObj = new Date(dateString);
    return dateObj
      .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      .replace('AM', 'ص')
      .replace('PM', 'م');
  }

  formatDate(dateString: Date | string) {
    const dateObj = new Date(dateString);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  }

  formatName(name: string): string {
    return name.replace(/(?!\s)الله/, '  الله');
  }

  loadAllData() {
    this.isLoading = true;
    Promise.all([this.getAllReports(), this.getAllVaccCertificate(), this.getAllVacIssues()])
      .then(() => {
        // Format the date, day, and time for each item
        this.allReportsAndCertificateAndVacIssues.forEach((item) => {
          if (item.date) {
            item.formattedDate = this.formatDate(item.date);
            item.formattedDay = this.formatDay(item.date);
          }
          if (item.enterTime) {
            item.formattedEnterTime = this.formatTime(item.enterTime);
          }
          if (item.leaveTime) {
            item.formattedLeaveTime = this.formatTime(item.leaveTime);
          }
        });
  
        // Sort the array from newest to oldest
        this.allReportsAndCertificateAndVacIssues.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA; // Newest first
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
  

  getAllReports(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ReportsService.getReportsByPatientId(this.patient?.patientId!).subscribe({
        next: (reports) => {
          this.reports = reports;
          this.allReportsAndCertificateAndVacIssues.push(...this.reports);
          resolve();
        },
        error: (err) => reject(err),
      });
    });
  }

  getAllVaccCertificate(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.VaccCertificatService.getVaccCertificatByStudentId(this.patient?.patientId!).subscribe({
        next: (certificat) => {
          this.vaccCertificate = certificat;
          this.allReportsAndCertificateAndVacIssues.push(...this.vaccCertificate);
          resolve();
        },
        error: (err) => reject(err),
      });
    });
  }

  getAllVacIssues(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.VaccCertificatService.getVaccDipenByStudentId(this.patient?.patientId!).subscribe({
        next: (vaccDipen) => {
          this.vacIssues = vaccDipen;
          this.allReportsAndCertificateAndVacIssues.push(...this.vacIssues);
          resolve();
        },
        error: (err) => reject(err),
      });
    });
  }

  async generatePdf(item: any): Promise<void> {
    const user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    let formData: any;
    let pdfPath: string;
    let fileName: string;

    const date = this.formatDate(item.date);
    const day = this.formatDay(item.date);
    const enterTime = this.formatTime(item.enterTime);
    const leaveTime = this.formatTime(item.leaveTime);

    if (item.reportType !== 'شهادة مطعوم الكبد الوبائي (B)' && item.reportType !== 'صرف مطعوم الكبد الوبائي (B)') {
      formData = {
        reportId: item.reportId.toString(),
        doctorName: this.formatName(item.doctorName),
        patientName: this.formatName(item.patientName),
        patientId: item.patientId,
        enterTime: this.formatTime(item.enterTime),
        date: date,
        day: day,
        leaveTime: this.formatTime(item.leaveTime),
        reportType: item.reportType,
        description: item.description ?? '',
        recommendation: item.recommendation ?? ''
      };
      this.typeOfReports='review';
      pdfPath = `/assets/reports/review.pdf`;
      fileName = `${item.reportType} ${item.patientName}.pdf`;
      console.log('مراجعة',formData)
    } else if (item.reportType === 'صرف مطعوم الكبد الوبائي (B)') {
      formData = {
        id: item.vaccDipenId.toString(),
        studentId: item.studentId,
        studentName: this.formatName(item.studentName),
        college: item.college,
        major: item.major,
        doctorName:this.formatName(item.doctorName),
        date: date,
        day: day,
        leaveTime: leaveTime,
        enterTime: enterTime,
      };
      console.log('vacIssue',formData)
      pdfPath = 'assets/reports/vacIssue.pdf';
      fileName = `صرف مطعوم ${item.studentName}.pdf`;
      this.typeOfReports='vacIssue'
      
    } else if (item.reportType=='شهادة مطعوم الكبد الوبائي (B)') {
      formData = {
        id: item.vaccCertificatnId.toString(),
        managerName: this.formatName(item.managerName),
        studentName: this.formatName(item.studentName),
        studentId: item.studentId,
        major: item.major,
        college: item.college,
        dose: item.dose,
        day: day,
        date: date
      };
      console.log('vacIsvacCerificatesue',formData)
      this.typeOfReports='Certificat'
      pdfPath = 'assets/reports/vacCerificate.pdf';
      fileName = `شهادة مطعوم ${item.studentName}.pdf`;
    } else {
      console.error('Invalid item type');
      return;
    }


    const pdfBlob = await this.PDF.fillPdf(pdfPath, formData,this.typeOfReports);
    // Download the PDF
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }
}
