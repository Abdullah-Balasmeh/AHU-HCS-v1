import { MedicalRecordService } from './../../../services/medical-record.service';
import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [LoadingImageComponent ,ReactiveFormsModule,CommonModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent {
  @Input() patient: any;
  @Output() save = new EventEmitter<any>(); 
  @Output() close = new EventEmitter<void>(); 
  private medicalRecordService =inject(MedicalRecordService);
  saving = signal(false);
  editRecordForm: FormGroup;
  isDisabled: boolean = true; 
  constructor(private fb: FormBuilder) {
    this.editRecordForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required], 
      name: ['', Validators.required],
      state: ['', Validators.required],
      type: [{ value: '', disabled: true }],
    });
  }

  ngOnChanges(): void {
    if (this.patient) {
      this.editRecordForm.patchValue({
        id: this.patient.id,
        name: this.patient.name,
        state: this.patient.type,
        type: this.patient.class,
      });
    }
  }
  

  saveChanges(): void {
    this.saving.set(true);
  
    if (this.editRecordForm.valid) {
      // Preserve the original fields from `this.patient`
      const updatedPatient = {
        ...this.patient, // Include all original fields
        ...this.editRecordForm.getRawValue(), // Override with updated form values
        patientType: this.editRecordForm.value.state, // Preserve original type if not in the form
        enterDate: this.patient.enterDate, // Preserve original enterDate
        patientId: this.patient.id, // Preserve original patientId
      };
      // Send updated patient to the API
      this.medicalRecordService.updateMedicalRecord(updatedPatient.recordId, updatedPatient).subscribe({
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
