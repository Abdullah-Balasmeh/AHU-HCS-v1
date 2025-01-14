import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from '../../../services/medical-record.service';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";
import { MedicalRecord } from '../../../interfaces/patient.interface';

@Component({
  selector: 'app-reception-table',
  standalone: true,
  templateUrl: './reception-table.component.html',
  styleUrls: ['./reception-table.component.css'],
  imports: [LoadingImageComponent, CommonModule, EditDialogComponent],
})
export class ReceptionTableComponent implements OnInit {
  isLoading = true;
  records: MedicalRecord[] = []; // Array to store patients with medical records
  isEdit = false;
  record?: MedicalRecord | null =null ;
  constructor(private readonly medicalRecordService: MedicalRecordService) { }

  ngOnInit(): void {
    this.getTodayMedicalRecords();
  }
  getLocalDate = (): string => {
    const now = new Date();
    return now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  };

  getTodayMedicalRecords(): void {
    const today = this.getLocalDate();

    this.isLoading = true;

    this.medicalRecordService.getRecordsByEnterDate(today).subscribe({
      next: (records : MedicalRecord[]) => {
        this.records = records;
        records.sort((a: any, b: any) => new Date(a.enterDate).getTime() - new Date(b.enterDate).getTime());
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching records:', error);
        this.isLoading = false;
      },
    });
  }

  deleteRecord(record: MedicalRecord): void {
    if(record.medicalProcedures && record.prescription){
      if (confirm('Are you sure you want to delete this record?')) {
        this.medicalRecordService.deleteMedicalRecord(record.medicalRecordId).subscribe({
          next: () => {
            this.getTodayMedicalRecords(); // Refresh the records after deletion
          },
          error: (err) => {
            console.error('Error deleting record:', err);
            alert('Error deleting record.');
          },
        });
      }
    }else{
      alert('لا يمكنك حذف هذا السجل')
    }

  }

  EditModal(record: MedicalRecord): void {
    this.record = record ;
    this.isEdit = true;
  }
  saveUpdatedRecord(): void {
    this.getTodayMedicalRecords();
    this.closeEditModal();
  }
  closeEditModal(): void {
    this.isEdit = false;
    this.record = null;
  }

}
