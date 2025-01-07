import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownListComponent } from '../../shared/dropdown-list/dropdown-list.component';
import { MultiSelectDropdownComponent } from '../../shared/dropdown-menu/dropdown-menu.component';
import { PatientService } from './../../../services/patient.service';
import { Patient } from '../../../interfaces/patient.interface';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';

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
  styleUrls: ['./patient-info-first.component.css'],
})
export class PatientInfoFirstComponent {
  @Input() patient: Patient | null = null;
  @Output() save = new EventEmitter<Patient>();
  private readonly destroy$ = new Subject<void>();
  vaccineStatus: number = 0;
  selectedFileName: string | null = null;
  private readonly patientService = inject(PatientService);

  onVaccineStatusChange(): void {
    if (this.patient) {
      this.patient.takeVac = this.vaccineStatus === 1; // Update based on the current status
      console.log('Vaccine status updated:', this.patient.takeVac);
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
      console.log('Updated Blood Type:', this.patient.bloodType);
    }
  }

  onAllergyChange(selected: string[]): void {
    if (this.patient) {
      this.patient.allergy = [...selected]; // Ensure immutability
      console.log('Updated Allergy:', this.patient.allergy);
    }
  }

  onChronicDiseasesChange(selected: string[]): void {
    if (this.patient) {
      this.patient.chDisease = [...selected]; // Ensure immutability
      console.log('Updated Chronic Diseases:', this.patient.chDisease);
    }
  }

  onMedicationsChange(selected: string[]): void {
    if (this.patient) {
      this.patient.medicine = [...selected]; // Ensure immutability
      console.log('Updated Medications:', this.patient.medicine);
    }
  }

  onSubmit(): void {
    if (this.patient) {
      console.log('Submitting patient data:', this.patient);
      this.patientService
        .updatePatient(this.patient.patientId as string, this.patient)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            console.log('Patient data updated successfully');
            this.save.emit(this.patient as Patient); // Emit the updated patient
          },
          error: (err) => {
            console.error('Error updating patient:', err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
