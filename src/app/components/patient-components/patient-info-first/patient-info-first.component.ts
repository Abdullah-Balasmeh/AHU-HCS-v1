import { ChDiseaseService } from './../../../services/ch-disease.service';
import { MedicineService } from './../../../services/medicine.service';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownListComponent } from '../../shared/dropdown-list/dropdown-list.component';
import { MultiSelectDropdownComponent } from '../../shared/dropdown-menu/dropdown-menu.component';
import { PatientService } from './../../../services/patient.service';
import { Patient } from '../../../interfaces/patient.interface';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { AllergyService } from '../../../services/allergy.service';

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
export class PatientInfoFirstComponent implements OnInit {

  @Input() patient: Patient | null = null;
  @Output() save = new EventEmitter<Patient>();
  private readonly destroy$ = new Subject<void>();
  vaccineStatus: number = 0;
  selectedFileName: string | null = null;
  private readonly patientService = inject(PatientService);
  private readonly medicineService =inject(MedicineService);
  private readonly chDiseaseService =inject(ChDiseaseService);
  private readonly allergyService =inject(AllergyService);
  medicines: string[] = [];
  chDiseases: string[] = [];
  allergy:string[]=[];
  ngOnInit(): void {
    this.getAllDisease();
    this.getAllMedicines();
    this.getAllAllergy();
  }
  getAllMedicines(): void {
    this.medicineService.getAllMedicines().subscribe({
      next: (medicines) => {
        this.medicines = medicines.map((medicine: any) => `${medicine.name} - ${medicine.dose}`);
      },
      error: (err) => {
        console.error('Error fetching medicines:', err);
      },
    });
  }

  getAllAllergy(): void {
    this.allergyService.getAllAllergies().subscribe({
      next: (allergy) => {
        this.allergy = allergy.map((allergy: any) => allergy.name);
      },
      error: (err) => {
        console.error('Error fetching medicines:', err);
      },
    });
  }
  getAllDisease(): void {
    this.chDiseaseService.getAllChDisease().subscribe({
      next: (chDiseases) => {
        this.chDiseases = chDiseases.map((chDiseases: any) => chDiseases.name);
      },
      error: (err) => {
        console.error('Error fetching chDiseases:', err);
      },
    });
  }
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.selectedFileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        if (this.patient) {
          this.patient.vacData = reader.result as string; 
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
      this.patient.allergy = [...selected];
    }
  }

  onChronicDiseasesChange(selected: string[]): void {
    if (this.patient) {
      this.patient.chDisease = [...selected];
    }
  }

  onMedicationsChange(selected: string[]): void {
    if (this.patient) {
      this.patient.medicine = [...selected];
    }
  }

  onSubmit(): void {
    if (this.patient) {
      if(this.vaccineStatus==1)
        {
          this.patient.takeVac = true;
        }else{
          this.patient.takeVac = false;
        }
      this.patientService
        .updatePatient(this.patient.patientId!, this.patient)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.save.emit(this.patient as Patient);
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
