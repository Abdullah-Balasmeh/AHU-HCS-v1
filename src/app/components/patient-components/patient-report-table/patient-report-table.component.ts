import { Component, Input } from '@angular/core';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-report-table',
  standalone: true,
  imports: [LoadingImageComponent,CommonModule],
  templateUrl: './patient-report-table.component.html',
  styleUrl: './patient-report-table.component.css'
})
export class PatientReportTableComponent {
  @Input() patient: any | null = null;
  isLoading = false;
  downloadReport(patient : any){
  
  }
}
