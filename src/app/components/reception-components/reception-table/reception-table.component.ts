import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from '../../../services/medical-record.service';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";
import { MedicalRecord } from '../../../interfaces/patient.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reception-table',
  standalone: true,
  templateUrl: './reception-table.component.html',
  styleUrls: ['./reception-table.component.css'],
  imports: [LoadingImageComponent, CommonModule, EditDialogComponent],
})
export class ReceptionTableComponent implements OnInit {
  private readonly destroy$ = new Subject<void>();
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
    const offset = now.getTimezoneOffset() * 60000; // Get the offset in milliseconds
    const localTime = new Date(now.getTime() - offset); // Adjust for local time
    return localTime.toISOString().split('T')[0]; // Extract the date
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
      error: () => this.isLoading = false,
  
    });
  }

  deleteRecord(record: MedicalRecord): void {
    if(!record.medicalProcedures && !record.prescription){
      if (confirm('هل أنت متأكد أنك تريد حذف هذا السجل؟')) {
        this.medicalRecordService.deleteMedicalRecord(record.medicalRecordId).pipe(takeUntil(this.destroy$)).subscribe({
          next: () => {
            this.getTodayMedicalRecords(); // Refresh the records after deletion
          },
          error: () => alert('حدث خطأ إثناء الحذف , يرحى المحاولة لاحقا'),
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
