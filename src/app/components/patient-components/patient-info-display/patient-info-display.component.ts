import { Component,Input } from '@angular/core';

import { Patient } from '../../../interfaces/patient.interface';
@Component({
  selector: 'app-patient-info-display',
  standalone: true,
  imports: [],
  templateUrl: './patient-info-display.component.html',
  styleUrl: './patient-info-display.component.css'
})
export class PatientInfoDisplayComponent {

  @Input() patient?: Patient | null  = null;


}
