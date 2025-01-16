import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { BPRecord} from '../../../interfaces/patient.interface';
import { BPRecordService } from '../../../services/bprecord.service';
import { CommonModule } from '@angular/common';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";



@Component({
  selector: 'app-bp-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingImageComponent],
  templateUrl: './bp-table.component.html',
  styleUrl: './bp-table.component.css'
})
export class BpTableComponent implements OnInit {

  constructor(private readonly bpRecordService: BPRecordService) {}

  
  @Input() patientId!: string;
  bpRecords: BPRecord[] = [];
  isEdit = false;
  isLoading = false;
  currentBpRecord: BPRecord = { bpRecordId: 0, bpDown: '' , bpUp:'' , note:''};
  bpForm = new FormGroup({
    bpUp: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      this.rangeValidator(50, 300),
    ]),
    bpDown: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      this.rangeValidator(20, 200),
    ]),
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
    this.loadBPRecords();
  }
    



  loadBPRecords(): void {
    this.isLoading=true;
    this.bpRecordService.getBPRecordsByPatientId(this.patientId).subscribe({
      next: (records) => {
        this.bpRecords = records.map(record => ({
          ...record,
          formattedDate: this.formatDate(record.date!) // Format the date here
        }));
        this.isLoading = false;
      },
      error: (er) => {
        console.error(er);
      }
    });
  }
  
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
  

  getLocalDate = (): string => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Get the offset in milliseconds
    const localTime = new Date(now.getTime() - offset); // Adjust for local time
    return localTime.toISOString(); 
    
};
  
  addBPRecord(): void {
    if (this.bpForm.invalid) {
      alert('يرجى ملئ قراءات ضغط الدم');
      this.bpForm.markAllAsTouched();
      return;
    }
    const newRecord: BPRecord = {
      patientId: this.patientId,
      bpUp: this.bpForm.get('bpUp')?.value ?? '',
      bpDown:this.bpForm.get('bpDown')?.value ?? '',
      note: this.bpForm.get('note')?.value ?? '',
      date: this.getLocalDate(),
    };

    this.bpRecordService.addBPRecord(this.patientId, newRecord).subscribe({
      next:()=>{
        this.loadBPRecords();
        this.resetForm();
      }
    });
  }
    Edit(bpRecord: BPRecord) {
      this.isEdit = true;
      this.currentBpRecord = { ...bpRecord };
      this.bpForm.patchValue({
        bpUp: this.currentBpRecord.bpUp,
        bpDown: this.currentBpRecord.bpDown,
        note: this.currentBpRecord.note
      });
    }
  onSave() {
      if (this.bpForm.invalid) {
        this.bpForm.markAllAsTouched();
        alert('Please enter a valid BPRecord Value.');
        return;
      }
      const UpdateRecord = {
        patientId:this.patientId,
        bpUp: this.bpForm.get('bpUp')?.value ?? '',
        bpDown:this.bpForm.get('bpDown')?.value ?? '',
        note: this.bpForm.get('note')?.value ?? '',
        date: this.getLocalDate(),
      };
      this.bpRecordService.updateBPRecord(this.currentBpRecord.bpRecordId!, UpdateRecord).subscribe({
        next: () => {
          this.resetForm();
          this.loadBPRecords();
        },
        error: (err) => {
          console.error('Error updating BPRecord', err);
          alert('Failed to update BPRecord. Please try again later.');
        },
      });
    }
  deleteBPRecord(recordId: number): void {
    const confirmed = confirm('هل أنت متأكد من حذف هذه القراءة؟');
    if(confirmed)
      {
        this.bpRecordService.deleteBPRecord(recordId).subscribe({
          next:()=>{
            this.bpRecords = this.bpRecords.filter((r) => r.bpRecordId !== recordId);
            alert('تم حذف القراءة بنجاح');
          },
          error: () => alert('حدث خطأ أثناء حذف القراءة'),
        });
      }

  }

    resetForm() {
      this.isEdit = false;
      this.currentBpRecord = { bpRecordId: 0, bpDown: '' , bpUp:'' , note:''};
      this.bpForm.reset(); 
      Object.keys(this.bpForm.controls).forEach((controlName) => {
        this.bpForm.get(controlName)?.markAsUntouched();
      });
    }


  
}
