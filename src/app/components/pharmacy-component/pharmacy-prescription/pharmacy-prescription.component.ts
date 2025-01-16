import { Component } from '@angular/core';
import { PrescriptionDialogComponent } from "../prescription-dialog/prescription-dialog.component";
import { MedicalRecord } from '../../../interfaces/patient.interface';
import { MedicalRecordService } from '../../../services/medical-record.service';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pharmacy-prescription',
  standalone: true,
  imports: [PrescriptionDialogComponent, LoadingImageComponent,CommonModule],
  templateUrl: './pharmacy-prescription.component.html',
  styleUrl: './pharmacy-prescription.component.css'
})
export class PharmacyPrescriptionComponent {
  records: MedicalRecord[] = [];
  showTab: boolean = true;
  showPrescriptionDialog: boolean = false;
  selectedPrescription: any = null;
  patientName:string='';
  isLoading = true;
  constructor(private medicalRecordService: MedicalRecordService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  getLocalDate = (): string => {
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60000; // Get the offset in milliseconds
      const localTime = new Date(now.getTime() - offset); // Adjust for local time
      return localTime.toISOString().split('T')[0]; // Extract the date
  };
    loadPatients(): void {
      const today = this.getLocalDate()
      this.isLoading = true;
    
      this.medicalRecordService.getRecordsByEnterDate(today).subscribe({
        next: (records) => {
          console.log('time clinic' , today)
          console.log('clinic records' , records );
          const filteredRecords = records.filter((record: MedicalRecord) => (record.patientType === 'عيادة' && record.prescription) );
          console.log('clinic filteredRecords' , filteredRecords );
          // Sort filtered records by enterDate in ascending order
          filteredRecords.sort((a: any, b: any) => new Date(a.enterDate).getTime() - new Date(b.enterDate).getTime());
          this.records = filteredRecords;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching records:', error);
          this.isLoading = false;
        },
      });
    }
  // Filter the patients to include only specific states


  openPrescriptionDialog(prescription: any , patientName : string): void {
    this.selectedPrescription = prescription;
    this.patientName=patientName;
    this.showPrescriptionDialog = true;
  }

  closeAll(): void {
    this.showPrescriptionDialog = false;
    this.showTab = true;
  }
}
