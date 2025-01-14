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

  constructor(private medicineService: MedicineService) {}

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
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching medicines', err);
        alert('Failed to load medicines. Please try again later.');
      },
    });
  }
  

  onAdd() {
    if (!this.currentMedicine.name!.trim() || !this.currentMedicine.dose!.trim()) {
      alert('Please fill out all fields.');
      return;
    }
  
    this.medicineService.addMedicine(this.currentMedicine).subscribe({
      next: (newMedicine) => {
        this.medicines.push(newMedicine);
        this.resetForm();
        alert('Medicine added successfully!');
      },
      error: (err) => {
        console.error('Error adding medicine', err);
        alert('Failed to add medicine. Please check the form and try again.');
      },
    });
  }
  

  onSave() {
    if (!this.currentMedicine.name!.trim() || !this.currentMedicine.dose!.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    this.medicineService.updateMedicine(this.currentMedicine.medicineId!, this.currentMedicine).subscribe({
      next: () => {
        alert('Medicine Edited successfully!');
        const index = this.medicines.findIndex(m => m.medicineId === this.currentMedicine.medicineId);
        if (index > -1) this.medicines[index] = { ...this.currentMedicine };
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating medicine', err);
        alert('Failed to update medicine. Please try again later.');
      },
    });
  }

  Edit(medicine: Medicine) {
    this.isEdit = true;
    this.currentMedicine = { ...medicine };
  }

  deleteMedicine(id: number) {
    if (confirm('Are you sure you want to delete this medicine?')) {
      this.medicineService.deleteMedicine(id).subscribe({
        next: () => {
          this.medicines = this.medicines.filter(m => m.medicineId !== id);
        },
        error: (err) => {
          console.error('Error deleting medicine', err);
          alert('Failed to delete medicine. Please try again later.');
        },
      });
    }
  }

  resetForm() {
    this.isEdit = false;
    this.currentMedicine = { medicineId: 0, name: '', dose: '' };
  }
}
