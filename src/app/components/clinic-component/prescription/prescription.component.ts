import { MedicalRecordService } from './../../../services/medical-record.service';
import { DiseaseService } from './../../../services/disease.service';
import { MedicineService } from './../../../services/medicine.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MultiSelectDropdownComponent } from "../../shared/dropdown-menu/dropdown-menu.component";
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { Prescription } from '../../../interfaces/patient.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-prescription',
  standalone: true,
  imports: [MultiSelectDropdownComponent, LoadingImageComponent,CommonModule],
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  private readonly destroy$ = new Subject<void>();
  @Input() prescription: Prescription | null  = null;
  @Input() patientName: string ='';
  @Input() MedicalRecordId: number = 0;
  errorMassage='';
  
  saving = false;
  medicines: string[] = [];
  diseases: string[] = [];
  selectedMedicines: string[] = [];
  selectedDiseases: string[] = [];
  isEditPrescription=false;


  private readonly medicalRecordService = inject(MedicalRecordService);
  private readonly medicineService = inject(MedicineService);
  private readonly diseaseService = inject(DiseaseService);


  ngOnInit(): void {
    if (this.prescription) {
      this.selectedDiseases = this.prescription.disease || [];
      this.selectedMedicines = this.prescription.medicine || [];
    }
    this.getAllMedicines();
    this.getAllDisease();
  }
  



  getAllMedicines(): void {
    this.medicineService.getAllMedicines().pipe(takeUntil(this.destroy$)).subscribe({
      next: (medicines) => {
        this.medicines = medicines.map((medicine: any) => `${medicine.name} - ${medicine.dose}`);
      },
    });
  }
  getAllDisease(): void {
    this.diseaseService.getAllDiseases().pipe(takeUntil(this.destroy$)).subscribe({
      next: (diseases) => {
        this.diseases = diseases.map((disease: any) => disease.name);
      },
    });
  }
  onMedicinesChange(selected: string[]): void {
    this.selectedMedicines = [...selected];
  }
  
  onDiseasesChange(selected: string[]): void {
    this.selectedDiseases = [...selected];
  }
  
  onSubmit(): void {
    if (this.selectedDiseases.length === 0 || this.selectedMedicines.length === 0) {
      this.errorMassage = 'يرجى إختيار مرض وعلاج';
      return;
    }
    this.saving = true;
    const user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
  
    // Prepare the prescription object
    const UpdatePrescription: Prescription = {
      disease: this.selectedDiseases,
      medicine: this.selectedMedicines,
      medicalRecordId: this.MedicalRecordId,
      userId: parsedUser?.userId ?? 0,
    };
  
    // Call the service to update the prescription
    this.medicalRecordService
      .addOrUpdatePrescription(this.MedicalRecordId, UpdatePrescription)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.saving = false;
          this.isEditPrescription = true;
          alert(
            this.isEditPrescription
              ? `تم تحديث الوصفة الطبية للمريض ${this.patientName}`
              : `تم إضافة وصفة طبية للمريض ${this.patientName}`
          );
        },
        error: () => {
          this.saving = false;
          alert('حدث خطأ أثناء تحديث الوصفة الطبية.');
        },
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  }
  
  












