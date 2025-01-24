import { MedicalRecordService } from './../../../services/medical-record.service';
import { DiseaseService } from './../../../services/disease.service';
import { MedicineService } from './../../../services/medicine.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MultiSelectDropdownComponent } from "../../shared/dropdown-menu/dropdown-menu.component";
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { Prescription } from '../../../interfaces/patient.interface';

@Component({
  selector: 'app-prescription',
  standalone: true,
  imports: [MultiSelectDropdownComponent, LoadingImageComponent,CommonModule],
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  @Input() prescription: Prescription={};
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
    this.medicineService.getAllMedicines().subscribe({
      next: (medicines) => {
        // Map medicines and spread selectedMedicines
        this.medicines = [
          ...this.selectedMedicines,
          ...medicines.map((medicine: any) => `${medicine.name} - ${medicine.dose}`),
           // Spread elements of selectedMedicines
        ];
      },
      error: (error) => {
        console.error('Error fetching medicines:', error);
      },
    });
  }
  
  getAllDisease(): void {
    this.diseaseService.getAllDiseases().subscribe({
      next: (diseases) => {
        // Map diseases and spread selectedDiseases
        this.diseases = [
          ...this.selectedDiseases,
          ...diseases.map((disease: any) => disease.name),
           // Spread elements of selectedDiseases
        ];
      },
      error: (error) => {
        console.error('Error fetching diseases:', error);
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
    this.saving = true;
    this.errorMassage = ''; // Clear previous error message
  
    // Validation: Check if any required selection is empty
    if (this.selectedDiseases.length === 0 || this.selectedMedicines.length === 0) {
      this.errorMassage = 'يرجى اختيار مرض و علاج'; // Set error message
      this.saving = false;
      return;
    }
  
    const user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
  
    if (!parsedUser) {
      alert('يرجى تسجيل الدخول مرة أخرى.');
      this.saving = false;
      return;
    }
  
    // Prepare prescription object
    const UpdatePrescription: Prescription = {
      disease: this.selectedDiseases,
      medicine: this.selectedMedicines,
      medicalRecordId: this.MedicalRecordId,
      userId: parsedUser.userId,
    };
  
    this.medicalRecordService
      .addOrUpdatePrescription(this.MedicalRecordId, UpdatePrescription)
      .subscribe({
        next: () => {
          this.saving = false;
          this.isEditPrescription = true;
          alert(
            this.isEditPrescription
              ? `تم تحديث الوصفة الطبية للمريض ${this.patientName}`
              : `تم إضافة وصفة طبية للمريض ${this.patientName}`
          );
          // Reset error message after successful submission
          this.errorMassage = '';
        },
        error: () => {
          this.saving = false;
          alert('حدث خطأ أثناء تحديث الوصفة الطبية.');
        },
      });
  }
  
  
  
  


  }
  
  












