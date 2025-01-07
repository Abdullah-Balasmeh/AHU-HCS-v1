import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from '../../../interfaces/patient.interface';

@Component({
  selector: 'app-patient-info',
  standalone: true,
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent {
  @Input() patient: Patient | null = null;
  @Output() edit = new EventEmitter<void>();
  onEditClick(): void {
    this.edit.emit(); // Emit edit event
  }
  
}
