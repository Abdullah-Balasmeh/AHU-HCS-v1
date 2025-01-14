import { Patient } from '../../../interfaces/patient.interface';
import { PatientService } from './../../../services/patient.service';
import { Component,inject,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-info-display',
  standalone: true,
  imports: [],
  templateUrl: './patient-info-display.component.html',
  styleUrl: './patient-info-display.component.css'
})
export class PatientInfoDisplayComponent implements OnInit {
  ngOnInit(): void {
    this.loadPatientInfo();
  }
patient: Patient| null  = null;
  @Input() patientId: string  = '';
  private readonly patientService=inject(PatientService)

  loadPatientInfo():void{
      this.patientService.getPatientById(this.patientId).subscribe({
        next:(patient: Patient)=>{
          this.patient=patient;
        }
      })

  }
}
