import { Component } from '@angular/core';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { Medicine } from '../../../../interfaces/list.interface';
import { MedicineService } from '../../../../services/medicine.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-medicine',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule,FormsModule],
  templateUrl: './add-medicine.component.html',
  styleUrl: './add-medicine.component.css'
})
export class AddMedicineComponent {
  isLoading = true;
  isEdit = false;
  medicines: Medicine[] = [];
  currentMedicine: Medicine = { medicineId: 0, name: '', dose: '' };
  isSaving=false;
  constructor(private readonly medicineService: MedicineService) {}

  ngOnInit() {
    this.fetchMedicines();
  }

  fetchMedicines() {
    this.isLoading = true;
    this.medicineService.getAllMedicines().subscribe({
      next: (medicines) => {
        this.isLoading = false;
        this.medicines = medicines;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
  

  onAdd() {
    if (!this.currentMedicine.name!.trim()) {
      alert('يرجى إدخال اسم العلاج');
      return;
    }
    this.isSaving=true;
const newMedicine= this.currentMedicine={
    ...this.currentMedicine,
    dose: this.currentMedicine.dose ?? '',
  }
    this.medicineService.addMedicine(newMedicine).subscribe({
      next: (newMedicine) => {
        this.isSaving=false;
        this.medicines.push(newMedicine);
        alert('تم إضافة العلاج بنجاح');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding medicine', err);
        alert('فشل في إضافة العلاج. يرجى التحقق من النموذج والمحاولة مرة أخرى.');
        this.isSaving=false;
      },
    });
  }
  

  onSave() {
    if (!this.currentMedicine.name!.trim()) {
      alert('يرجى إدخال اسم العلاج');
      return;
    }
    this.isSaving=true;
    this.medicineService.updateMedicine(this.currentMedicine.medicineId!, this.currentMedicine).subscribe({
      next: () => {
        this.isSaving=false;
        alert('تم تعديل العلاج بنجاح');
        const index = this.medicines.findIndex(m => m.medicineId === this.currentMedicine.medicineId);
        if (index > -1) this.medicines[index] = { ...this.currentMedicine };
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating medicine', err);
        alert('فشل تحديث العلاج. يرجى المحاولة مرة أخرى لاحقًا.');
        this.isSaving=false;
      },
    });
  }

  Edit(medicine: Medicine) {
    this.isEdit = true;
    this.currentMedicine = { ...medicine };
  }

  deleteMedicine(id: number) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا العلاج؟')) {
      this.medicineService.deleteMedicine(id).subscribe({
        next: () => {
          this.medicines = this.medicines.filter(m => m.medicineId !== id);
        },
        error: (err) => {
          console.error('Error deleting medicine', err);
          alert('فشل حذف العلاج. يرجى المحاولة مرة أخرى لاحقًا.');
          this.isSaving=false;
        },
      });
    }
  }

  resetForm() {
    this.isEdit = false;
    this.currentMedicine = { medicineId: 0, name: '', dose: '' };
  }
}
