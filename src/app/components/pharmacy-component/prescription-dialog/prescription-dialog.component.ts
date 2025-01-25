import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prescription } from '../../../interfaces/patient.interface';
import { MedicalRecordService } from '../../../services/medical-record.service';

@Component({
  selector: 'app-prescription-dialog',
  standalone: true,
  imports: [],
  templateUrl: './prescription-dialog.component.html',
  styleUrl: './prescription-dialog.component.css'
})

export class PrescriptionDialogComponent {
    constructor(private readonly medicalRecordService: MedicalRecordService) {}
  @Input() patientName: string = '';
  @Input() prescription: Prescription | null = null;
  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }
  onSubmit()
  {
    const updatePrescription: Prescription = {
      ...this.prescription,
      isSubmit:true,
    }
    console.log('prescription',updatePrescription)
    this.prescription!.isSubmit=true;
    this.medicalRecordService.addOrUpdatePrescription(this.prescription?.medicalRecordId!,updatePrescription).subscribe({
      next:(prescription)=>{
        this.closeDialog();
        console.log('prescription',prescription)
      }
    })
    
  }
}
