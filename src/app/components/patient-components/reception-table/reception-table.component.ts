import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from '../../../services/medical-record.service';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { EditDialogComponent } from "../../reception-components/edit-dialog/edit-dialog.component";

@Component({
  selector: 'app-reception-table',
  standalone: true,
  templateUrl: './reception-table.component.html',
  styleUrls: ['./reception-table.component.css'],
  imports: [LoadingImageComponent, CommonModule, EditDialogComponent],
})
export class ReceptionTableComponent implements OnInit {
  isLoading = true;
  patients: any[] = []; // Array to store patients with medical records
  isEdit=false;
  editRecord:any=null;
  constructor(private medicalRecordService: MedicalRecordService) {}

  ngOnInit(): void {
    this.getTodayMedicalRecords();
  }

  // Fetch medical records added today
  getTodayMedicalRecords(): void {
    const now = new Date();
    const offset = now.getTimezoneOffset(); // Get timezone offset in minutes
    const localDate = new Date(now.getTime() - offset * 60 * 1000).toISOString();
    this.isLoading = true;
  
    this.medicalRecordService.getRecordsByEnterDate(localDate).subscribe({
      next: (records) => {
        console.log('API Response:', records); // Log API response
        
        // Sort records by enterDate in ascending order
        records.sort((a: any, b: any) => new Date(a.enterDate).getTime() - new Date(b.enterDate).getTime());
  
        // Map sorted records to patients
        this.patients = records.map((record: any) => ({
          name: record.patient?.patientName || 'N/A',
          id: record.patient?.patientId || 'N/A',
          class: record.patient?.patientClass || 'N/A',
          type: record.patientType || 'N/A',
          recordId: record.medicalRecordId,
          enterDate: record.enterDate,
        }));
  
        console.log('Mapped and Sorted Patients:', this.patients); // Log sorted patients
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching records:', error);
        this.isLoading = false;
      },
    });
  }
  
  deleteRecord(recordId: string): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.medicalRecordService.deleteMedicalRecord(recordId).subscribe({
        next: () => {
          this.getTodayMedicalRecords(); // Refresh the records after deletion
        },
        error: (err) => {
          console.error('Error deleting record:', err);
          alert('Error deleting record.');
        },
      });
    }
  }
  
  EditModal(patient:any): void {
    this.editRecord={...patient}
    this.isEdit = true; 
  }
  saveUpdatedRecord(): void {
    this.getTodayMedicalRecords(); 
    this.closeEditModal();
  }
  closeEditModal(): void {
    this.isEdit = false;
    this.editRecord=null;
  }
  
}
