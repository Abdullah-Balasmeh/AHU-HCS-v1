import { Component, inject, OnInit } from '@angular/core';
import { LoadingImageComponent } from "../../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { VaccCertificatService } from '../../../../../services/vacc-certificat.service';
import { VaccCertificat } from '../../../../../interfaces/VaccCertificat.inertface';
import { PDF } from '../../../../../services/pdf.service';


@Component({
  selector: 'app-certificate-table',
  standalone: true,
  imports: [LoadingImageComponent,CommonModule],
  templateUrl: './certificate-table.component.html',
  styleUrl: './certificate-table.component.css'
})
export class CertificateTableComponent implements OnInit{
  private readonly vaccCertificatService=inject(VaccCertificatService);
  private readonly PDF=inject(PDF);

  isLoading=false;
  vaccCertificats:VaccCertificat[]=[];

  ngOnInit(): void {
this.loadVaccCertificat();
  }
  loadVaccCertificat()
  {
    this.isLoading=true;
    this.vaccCertificatService.getAllVaccCertificats().subscribe({
      next:(Certificats)=>{
        this.isLoading=false;
        this.vaccCertificats=Certificats;
      },
      error:(err)=>console.error(err)
    })
  }

  formatDate(dateString: Date): { date: string; time: string; day: string } {
    const dateObj = new Date(dateString);
  
    // Format the date in 'MM/DD/YYYY' format
    const date =`${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  
    // Format the time in 12-hour format with AM/PM
    const time = dateObj
      .toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .replace('AM', 'ص')
      .replace('PM', 'م');
  
    // Get the day name in Arabic
    const day = dateObj.toLocaleDateString('ar-EG', { weekday: 'long' });
  
    return { date, time, day };
  }
  formatName(name: string): string {
    return name.replace(/(?!\s)الله/, ' الله');
  }

  async generatePdf(vaccCertificat : VaccCertificat): Promise<void> {

    const fullDate=this.formatDate(vaccCertificat.date as Date);
    const formData = {
      reportType:vaccCertificat.reportType,
      id:vaccCertificat.vaccCertificatnId?.toString(),
      managerName:this.formatName(vaccCertificat.managerName!),
      studentName:this.formatName(vaccCertificat.studentName!),
      studentId:vaccCertificat.studentId ,
      major: vaccCertificat.major,
      college:vaccCertificat.college,
      dose: vaccCertificat.dose,
      day: fullDate.day,
      date: fullDate.date,
    };

    const pdfBlob = await this.PDF.fillPdf('assets/reports/vacCerificate.pdf', formData , 'Certificat');

    // Download the PDF
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download =`${vaccCertificat.reportType} ${vaccCertificat.studentName}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

}
