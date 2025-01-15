import { DiabtetesRecordService } from './../../../services/diabtetes-record.service';
import { Component,Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DiabtetesRecord, Patient } from '../../../interfaces/patient.interface';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diabetes-table',
  standalone: true,
  imports: [LoadingImageComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './diabetes-table.component.html',
  styleUrl: './diabetes-table.component.css'
})
export class DiabetesTableComponent {
constructor(private readonly diabtetesRecordService : DiabtetesRecordService){}

  // Input to receive selected patient
  @Input() patientId!: string;
  diabetesRecords: DiabtetesRecord[] = [];
  // FormGroup for BP inputs
  diabetesForm = new FormGroup({
    FBS: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), this.rangeValidator(70, 100),]),
    RBS: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), this.rangeValidator(70, 140),]),
    note: new FormControl(''),
  });

  // Flag to track loading state
  isLoading = true;

  rangeValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = +control.value; // Convert to number
      if (value < min || value > max) {
        return { rangeError: `القيمة يجب أن تكون بين ${min} و ${max}` };
      }
      return null; // Valid value
    };
  }
  ngOnInit(): void {
      this.loadDiabtetesRecord();

  }
  getLocalDate = (): string => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Get the offset in milliseconds
    const localTime = new Date(now.getTime() - offset); // Adjust for local time
    return localTime.toISOString().split('T')[0]; // Extract the date
};
  loadDiabtetesRecord(): void {
    this.isLoading = true;
    this.diabtetesRecordService.getDiabtetesRecordsByPatientId(this.patientId).subscribe({
      next: (record) => {
        this.diabetesRecords = record; 
        this.isLoading = false;
      },
      error: () => {
        alert('Failed to load patient data.');
        this.isLoading = false;
      },
    });
  }

  /**
   * Adds a new BP reading to the patient's medical record.
   */
  addDiabetesReading(): void {
    if (this.diabetesForm.invalid) {
      alert('يرجى ملئ قراءات السكري');
      return;
    }
const newDiabtetesRecord: DiabtetesRecord = {
  fbs:this.diabetesForm.get('FBS')?.value ?? '',
  rbs: this.diabetesForm.get('RBS')?.value ?? '',
  note:this.diabetesForm.get('note')?.value ?? '',
  date:this.getLocalDate(),
  patientId: this.patientId,
    }
    this.diabtetesRecordService.addDiabtetesRecord(this.patientId, newDiabtetesRecord).subscribe((record) => {
      this.diabetesRecords.push(record);
  });
  }

  deleteDiabetesReading(recordId: number): void {
    // Show confirmation dialog first
    const confirmed = confirm('هل أنت متأكد من حذف هذه القراءة؟');
    if(confirmed)
      {
        this.diabtetesRecordService.deleteDiabtetesRecord(recordId).subscribe({
          next:()=>{
            this.diabetesRecords = this.diabetesRecords.filter((r) => r.diabtetesRecordId !== recordId);
            alert('تم حذف القراءة بنجاح');
          },
          error: () => alert('حدث خطأ أثناء حذف القراءة'),
        });
      }
  }

}
