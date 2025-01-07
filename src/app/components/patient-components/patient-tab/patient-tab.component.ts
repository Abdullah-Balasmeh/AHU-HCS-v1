import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../../interfaces/patient.interface';

@Component({
  selector: 'app-patient-tab',
  standalone: true,
  imports: [],
  templateUrl: './patient-tab.component.html',
  styleUrl: './patient-tab.component.css'
})
export class PatientTabComponent {
  @Output() tabChange = new EventEmitter<string>();
  @Input() patient: Patient | null = null;

  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
