import { DiabtetesRecordService } from './../../../services/diabtetes-record.service';
import { Component,Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DiabtetesRecord } from '../../../interfaces/patient.interface';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diabetes-table',
  standalone: true,
  imports: [LoadingImageComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './diabetes-table.component.html',
  styleUrl: './diabetes-table.component.css'
})
export class DiabetesTableComponent  implements OnInit{
constructor(private readonly diabtetesRecordService : DiabtetesRecordService){}

  // Input to receive selected patient
  @Input() patientId!: string;
  diabetesRecords: DiabtetesRecord[] = [];
  currentDiabtetesRecord: DiabtetesRecord = { diabtetesRecordId: 0, fbs: '' , rbs:'' , note:''};
  isEdit = false;
  isLoading = false;
  diabetesForm = new FormGroup({
    FBS: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), this.rangeValidator(70, 100),]),
    RBS: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), this.rangeValidator(70, 140),]),
    note: new FormControl(''),
  });


  rangeValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = Number(control.value); // Ensure conversion to number
      if (isNaN(value)) {
        return { rangeError: `القيمة يجب أن تكون رقمًا صالحًا بين ${min} و ${max}` };
      }
      if (value < min || value > max) {
        return { rangeError: `القيمة يجب أن تكون بين ${min} و ${max}` };
      }
      return null; // Valid value
    };
  }
  ngOnInit(): void {
      this.loadDiabtetesRecord();

  }
  loadDiabtetesRecord(): void {
    this.isLoading = true;
    this.diabtetesRecordService.getDiabtetesRecordsByPatientId(this.patientId).subscribe({
      next: (records) => {
        this.diabetesRecords = records.map(record => ({
          ...record,
          formattedDate: this.formatDate(record.date!) // Format the date here
        }));
        this.isLoading = false;
        console.log('records', this.diabetesRecords);
      },
      error: () => {
        alert('Failed to load patient data.');
        this.isLoading = false;
      },
    });
  }

  getLocalDate = (): string => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Get the offset in milliseconds
    const localTime = new Date(now.getTime() - offset); // Adjust for local time
    return localTime.toISOString(); // Extract the date
};
formatDate(dateString: string): { date: string; time: string; day: string } {
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
  addDiabetesReading(): void {
    if (this.diabetesForm.invalid) {
      alert('يرجى ملئ قراءات السكري');
      this.diabetesForm.markAllAsTouched();
      return;
    }
const newDiabtetesRecord: DiabtetesRecord = {
  fbs:this.diabetesForm.get('FBS')?.value ?? '',
  rbs: this.diabetesForm.get('RBS')?.value ?? '',
  note:this.diabetesForm.get('note')?.value ?? '',
  date:this.getLocalDate(),
  patientId: this.patientId,
    }
    this.diabtetesRecordService.addDiabtetesRecord(this.patientId, newDiabtetesRecord).subscribe({
      next:()=>{
        this.loadDiabtetesRecord();
        this.resetForm();
      }
  });
  }
    Edit(diabtetesRecord: DiabtetesRecord) {
      this.isEdit = true;
      this.currentDiabtetesRecord = { ...diabtetesRecord };
      this.diabetesForm.patchValue({
        FBS: this.currentDiabtetesRecord.fbs,
        RBS: this.currentDiabtetesRecord.rbs,
        note: this.currentDiabtetesRecord.note
      });
    }

    onSave() {
      if (this.diabetesForm.invalid) {
        this.diabetesForm.markAllAsTouched();
        alert('Please enter a valid diabetesRecord Value.');
        return;
      }
      const UpdateRecord = {
        fbs:this.diabetesForm.get('FBS')?.value ?? '',
        rbs: this.diabetesForm.get('RBS')?.value ?? '',
        note:this.diabetesForm.get('note')?.value ?? '',
        date:this.getLocalDate(),
        patientId: this.patientId,
      };
      this.diabtetesRecordService.updateDiabtetesRecord(this.currentDiabtetesRecord.diabtetesRecordId!, UpdateRecord).subscribe({
        next: () => {
          this.resetForm();
          this.loadDiabtetesRecord();
        },
        error: (err) => {
          console.error('Error updating diabetes Record', err);
          alert('Failed to update diabetes Record. Please try again later.');
        },
      });
    }
  deleteDiabetesReading(recordId: number): void {
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


  resetForm() {
    this.isEdit = false;
    this.currentDiabtetesRecord =  { diabtetesRecordId: 0, fbs: '' , rbs:'' , note:''};
    this.diabetesForm.reset(); 
    Object.keys(this.diabetesForm.controls).forEach((controlName) => {
      this.diabetesForm.get(controlName)?.markAsUntouched();
    });
  }
}
