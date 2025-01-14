import { MedicalRecordService } from './../../../services/medical-record.service';
import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicalRecord } from '../../../interfaces/patient.interface';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [LoadingImageComponent ,ReactiveFormsModule,CommonModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent {
  @Input() record?: MedicalRecord | null =null ;
  @Output() save = new EventEmitter<any>(); 
  @Output() close = new EventEmitter<void>(); 
  private readonly medicalRecordService =inject(MedicalRecordService);
  saving = signal(false);
  editRecordForm: FormGroup;
  isDisabled: boolean = true; 
  constructor(private readonly fb: FormBuilder) {
    this.editRecordForm = this.fb.group({
      id: [{ value: '',}, Validators.required], 
      name: ['', Validators.required],
      state: ['', Validators.required],
      type: [{ value: '', disabled: true }],
    });
  }

  ngOnChanges(): void {
    if (this.record) {
      this.editRecordForm.patchValue({
        id: this.record.patient.patientId,
        name: this.record.patient?.patientName ?? '',
        state: this.record.patientType ?? '',
        type: this.record.patient?.patientClass ?? '',
      });
    }
  }

  

  saveChanges(): void {
    this.saving.set(true);
  
    if (this.editRecordForm.valid) {
      this.record = {
        ...this.record, 
        ...this.editRecordForm.getRawValue(),
        patientType: this.editRecordForm.value.state, 
        patientId: this.record?.patient.patientId, 
      };
      // Send updated patient to the API
      this.medicalRecordService.updateMedicalRecord( this.record?.medicalRecordId!, this.record).subscribe({
        next: () => {
          this.saving.set(false);
          this.save.emit(); // Notify the parent component of successful save
        },
        error: () => {
          this.saving.set(false);
          alert('حدث خطأ أثناء الحفظ');
        },
        complete: () => {
          this.saving.set(false);
        },
      });
    } else {
      alert('يرجى التحقق من البيانات المدخلة.');
      this.saving.set(false);
    }
  }
  

  closeDialog(): void {
    this.close.emit(); // Emit the close event
  }
}
