import { Component, EventEmitter, inject, Input, Output,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownListComponent } from "../../shared/dropdown-list/dropdown-list.component";
import { MultiSelectDropdownComponent } from "../../shared/dropdown-menu/dropdown-menu.component";
import { PatientService } from './../../../services/patient.service';
import { Patient } from '../../../interfaces/patient.interface';

@Component({
  selector: 'app-patient-info-first',
  standalone: true,
  imports: [
    DropdownListComponent,
    MultiSelectDropdownComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './patient-info-first.component.html',
  styleUrls: ['./patient-info-first.component.css']
})
export class PatientInfoFirstComponent {
  @Input() patient: Patient | null = null;
  @Output() save = new EventEmitter<Patient>();
  vaccineStatus: string = '';
  selectedFileName: string | null = null;
  private readonly patientService = inject(PatientService);
  onVaccineStatusChange(event: Event): void {
    const selected = (event.target as HTMLInputElement).value;
    this.vaccineStatus = selected;

    if (this.patient) {
      this.patient.takeVac = selected === 'true';
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.selectedFileName = file.name;

      // Convert the file to base64
      const reader = new FileReader();
      reader.onload = () => {
        if (this.patient) {
          this.patient.vacData = reader.result as string; // Save base64 string
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onBloodTypeChange(selected: string): void {
    if (this.patient) {
      this.patient.bloodType = selected;
    }
  }

  onAllergyChange(selected: string[]): void {
    if (this.patient) {
      this.patient.allergy = selected;
    }
  }

  onChronicDiseasesChange(selected: string[]): void {
    if (this.patient) {
      this.patient.chDisease = selected;
    }
  }

  onMedicationsChange(selected: string[]): void {
    if (this.patient) {
      this.patient.medicine = selected;
    }
  }

  onSubmit(): void {
    if (this.patient) {
      this.patientService.updatePatient(this.patient.patientId as string , this.patient)
      this.save.emit(this.patient);
    }
  }
}
