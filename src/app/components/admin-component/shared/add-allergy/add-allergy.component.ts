import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { Allergy } from '../../../../interfaces/list.interface';
import { AllergyService } from '../../../../services/allergy.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-allergy',
  standalone: true,
  imports: [CommonModule, LoadingImageComponent ,FormsModule],
  templateUrl: './add-allergy.component.html',
  styleUrl: './add-allergy.component.css'
})
export class AddAllergyComponent {
  isLoading = true;
  isEdit = false;
  allergies: Allergy[] = [];
  currentAllergy: Allergy = { allergyId: 0, name: '' };

  constructor(private readonly allergyService: AllergyService) {}

  ngOnInit() {
    this.fetchAllergies();
  }

  fetchAllergies() {
    this.isLoading = true;
    this.allergyService.getAllAllergies().subscribe({
      next: (allergies) => {
        this.isLoading = false;
        this.allergies = allergies;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching allergies', err);
      },
    });
  }

  onAdd() {
    if (!this.currentAllergy.name!.trim()) {
      alert('الرجاء إدخال اسم حساسية صالح.');
      return;
    }

    this.allergyService.addAllergy(this.currentAllergy).subscribe({
      next: (newAllergy) => {
        this.allergies.push(newAllergy);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding allergy', err);
        alert('فشل في إضافة الحساسية. يرجى المحاولة مرة أخرى لاحقًا.');
      },
    });
  }

  onSave() {
    if (!this.currentAllergy.name!.trim()) {
      alert('الرجاء إدخال اسم حساسية صالح.');
      return;
    }

    this.allergyService.updateAllergy(this.currentAllergy.allergyId!, this.currentAllergy).subscribe({
      next: () => {
        const index = this.allergies.findIndex(a => a.allergyId === this.currentAllergy.allergyId);
        if (index > -1) {
          this.allergies[index] = { ...this.currentAllergy };
        }
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating allergy', err);
        alert('فشل تحديث الحساسية. يرجى المحاولة مرة أخرى لاحقًا.');
      },
    });
  }

  Edit(allergy: Allergy) {
    this.isEdit = true;
    this.currentAllergy = { ...allergy };
  }

  deleteAllergy(allergyId: number) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذه الحساسية؟')) {
      this.allergyService.deleteAllergy(allergyId).subscribe({
        next: () => {
          this.allergies = this.allergies.filter(a => a.allergyId !== allergyId);
        },
        error: (err) => {
          console.error('Error deleting allergy', err);
          alert('فشل حذف الحساسية. يرجى المحاولة مرة أخرى لاحقًا.');
        },
      });
    }
  }

  resetForm() {
    this.isEdit = false;
    this.currentAllergy = { allergyId: 0, name: '' };
  }
}
