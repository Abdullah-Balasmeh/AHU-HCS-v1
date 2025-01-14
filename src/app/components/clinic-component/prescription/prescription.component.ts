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
  @Input() prescription: Prescription | null  = null;
  @Input() patientName: string ='';
  @Input() MedicalRecordId: number = 0;
  
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
        this.medicines = medicines.map((medicine: any) => `${medicine.name} - ${medicine.dose}`);
      },
      error: (err) => {
        console.error('Error fetching medicines:', err);
      },
    });
  }
  getAllDisease(): void {
    this.diseaseService.getAllDiseases().subscribe({
      next: (diseases) => {
        this.diseases = diseases.map((disease: any) => disease.name);
      },
      error: (err) => {
        console.error('Error fetching diseases:', err);
      },
    });
  }
  onMedicinesChange(selected: string[]): void {
    this.selectedMedicines = [...selected];
  }
  
  onDiseasesChange(selected: string[]): void {
    this.selectedDiseases = [...selected];
  }
  
  onSubmit() {
    this.saving = true;
  
    const user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
  
    if (!parsedUser) {
      alert('User not found in session. Please login again.');
      this.saving = false;
      return;
    }
  
    const UpdatePrescription: Prescription = {
      disease: this.selectedDiseases,
      medicine: this.selectedMedicines,
      medicalRecordId: this.MedicalRecordId,
      userId: parsedUser.userId,
    };
  
    console.log('Payload being sent:', UpdatePrescription);
  
    this.medicalRecordService.addOrUpdatePrescription(this.MedicalRecordId, UpdatePrescription).subscribe({
      next: () => {
        console.log('Successfully updated prescription', UpdatePrescription);
        this.saving = false;
        if (this.isEditPrescription) {
          alert(`تم تحديث الوصفة الطبية للمريض ${this.patientName}`);
        } else {
          alert(`تم إضافة وصفة طبية للمريض ${this.patientName}`);
          this.isEditPrescription=true;
        }
      },
      error: (err) => {
        console.error('Error updating prescription:', err);
        this.saving = false;
        alert('حدث خطأ أثناء تحديث الوصفة الطبية.');
      },
    });
  }
  
  

  }
  
  












