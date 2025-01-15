import { Component, Input } from '@angular/core';
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
export class BpTableComponent {

  constructor(private readonly bpRecordService: BPRecordService) {}
  // Input to receive selected patient
  @Input() patientId!: string;
  bpRecords: BPRecord[] = [];
  // FormGroup for BP inputs
  bpForm = new FormGroup({
    bpUp: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), this.rangeValidator(50, 300), ]),
    bpDown: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/) ,this.rangeValidator(20, 200), ]),
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
  gOnInit(): void {
    this.loadBPRecords();
  }

  loadBPRecords(): void {
    this.bpRecordService.getBPRecordsByPatientId(this.patientId).subscribe((records) => {
      this.bpRecords = records;
    });
  }
  // getLocalDate = (): { date: string; time: string; day: string } => {
  //   const now = new Date();
  
  //   // Format the date in 'MM/DD/YYYY' format
  //   const date = now.toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //   });
  
  //   // Format the time in 12-hour format with AM/PM
  //   const time = now
  //     .toLocaleTimeString('en-US', {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       hour12: true,
  //     })
  //     .replace('AM', 'ص')
  //     .replace('PM', 'م');
  
  //   // Get the day name in Arabic
  //   const day = now.toLocaleDateString('ar-EG', { weekday: 'long' });
  
  //   return { date, time, day };
  // };

  getLocalDate = (): string => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Get the offset in milliseconds
    const localTime = new Date(now.getTime() - offset); // Adjust for local time
    return localTime.toISOString().split('T')[0]; // Extract the date
};
  
  addBPRecord(): void {
    if (this.bpForm.invalid) {
      alert('يرجى ملئ قراءات ضغط الدم');
      return;
    }
    const newRecord: BPRecord = {
      patientId: this.patientId,
      bpUp: this.bpForm.get('bpUp')?.value ?? '',
      bpDown:this.bpForm.get('bpDown')?.value ?? '',
      note: this.bpForm.get('note')?.value ?? '',
      date: this.getLocalDate(),
    };

    this.bpRecordService.addBPRecord(this.patientId, newRecord).subscribe((record) => {
      this.bpRecords.push(record);
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

  
}
