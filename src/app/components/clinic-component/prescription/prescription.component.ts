import { Patient } from './../../../interfaces/patient.interface';
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
  @Input() patient: Patient  = {};
  saving = false;
  medicines: string[] = [];
  diseases: string[] = [];
  isEditPrescription=false;
  prescription: Prescription = {
    prescriptionId: undefined,
    disease: [''],
    medicine:[''],
    userId: '',
    date: new Date(),
    medicalRecordId:undefined,
  };

  private readonly medicalRecordService = inject(MedicalRecordService);
  private readonly medicineService = inject(MedicineService);
  private readonly diseaseService = inject(DiseaseService);


  ngOnInit(): void {
    if (this.prescription) {
      console.error('Record ID is required for PrescriptionComponent.');
      alert('Invalid record. Please select a valid medical record.');
      return;
    }
    this.getAllMedicines();
    this.getAllDisease();
    this.loadPrescription();
  }

  loadPrescription(): void {
    if(this.patient)
    this.medicalRecordService.getPrescriptionByRecordId(this.prescription.medicalRecordId!).subscribe({
      next: (prescription) => {
        if (prescription) {
          this.isEditPrescription=true;
          this.prescription = {
            prescriptionId: prescription.prescriptionId,
            medicine: prescription.medicine ? prescription.medicine.split(', ') : [],
            disease: prescription.disease ? prescription.disease.split(', ') : [],
            userId: prescription.userId || '',
            date: prescription.date || new Date(),
            medicalRecordId: prescription.medicalRecordId || this.prescription.medicalRecordId
          };
        }
      },
      error: (err) => {
        console.error('Error loading prescription:', err);
      },
    });
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

  onSubmit() {
    if (!this.prescription.disease!.length || !this.prescription.medicine!.length) {
      alert('Please select at least one disease and one medicine.');
      return;
    }

    this.saving = true;

    const user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;

    if (!parsedUser) {
      alert('User not found in session. Please login again.');
      this.saving = false;
      return;
    }

    const prescriptionPayload = {
      prescriptionId: this.prescription.prescriptionId ?? null,
      // disease: this.prescription.disease!.join(', '),
      // medicine: this.prescription.medicine!.join(', '),
      userId: parsedUser.userId,
      date: new Date().toISOString(),
      medicalRecordId: this.prescription.medicalRecordId
    };

    console.log('Payload to submit:', prescriptionPayload);

    this.medicalRecordService.addOrUpdatePrescription(this.prescription.medicalRecordId!, prescriptionPayload).subscribe({
      next: () => {
        this.saving = false;
        if(this.isEditPrescription){
          alert(`تم تحديث الوصفة الطبية للمريض ${this.patient.patientName}`);
        }else{
          alert(`تم إضافة وصفة طبية للمريض ${this.patient.patientName}`);
        }
      },
      error: (err) => {
        this.saving = false;
        console.error('Error updating prescription:', err);
        alert('حدث خطأ أثناء تحديث الوصفة الطبية.');
      },
    });
    
  }
  }
  
  












