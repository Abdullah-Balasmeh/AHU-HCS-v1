import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { DiseaseService } from '../../../../services/disease.service';
import { FormsModule } from '@angular/forms';
import { Diseases } from '../../../../interfaces/list.interface';

@Component({
  selector: 'app-add-disease',
  standalone: true,
  imports: [CommonModule, LoadingImageComponent,FormsModule],
  templateUrl: './add-disease.component.html',
  styleUrl: './add-disease.component.css'
})
export class AddDiseaseComponent {
  isLoading = true;
  isEdit = false;
  diseases: Diseases[] = [];
  currentDisease: Diseases = { diseaseId: 0, name: '' }; // Holds the disease being edited or added

  constructor(private readonly diseaseService: DiseaseService) {}

  ngOnInit() {
    this.fetchDiseases();
  }

  // Fetch all diseases
  fetchDiseases() {
    this.isLoading = true;
    this.diseaseService.getAllDiseases().subscribe({
      next: (diseases) => {
        this.isLoading = false;
        this.diseases = diseases;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  // Add new disease
  onAdd() {
    if (!this.currentDisease.name!.trim()) {
      alert('الرجاء إدخال اسم مرض صالح.');
      return;
    }

    this.diseaseService.addDisease(this.currentDisease).subscribe({
      next: (newDisease) => {
        alert('تم إضافة المرض بنجاح');
        this.diseases.push(newDisease);
        this.resetForm();
      },
      error: () => {
        alert('فشل في إضافة المرض. يرجى المحاولة مرة أخرى لاحقًا.');
      }
    });
  }

  // Save edited disease
  onSave() {
    if (!this.currentDisease.name!.trim()) {
      alert('الرجاء إدخال اسم مرض صالح.');
      return;
    }

    this.diseaseService.updateDisease(this.currentDisease.diseaseId!, this.currentDisease).subscribe({
      next: () => {
        alert('تم تعديل المرض بنجاح');
        const index = this.diseases.findIndex(d => d.diseaseId === this.currentDisease.diseaseId);
        if (index > -1) {
          this.diseases[index] = { ...this.currentDisease };
        }
        this.resetForm();
      },
      error: () => {
        alert('فشل تحديث المرض. يرجى المحاولة مرة أخرى لاحقًا.');
      }
    });
  }

  Edit(disease: Diseases) {
    this.isEdit = true;
    this.currentDisease = { ...disease };
  }

  // Reset form
  resetForm() {
    this.isEdit = false;
    this.currentDisease = { diseaseId: 0, name: '' };
  }

  // Delete disease
  deleteDisease(diseaseId: number) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا المرض؟')) {
      this.diseaseService.deleteDisease(diseaseId).subscribe({
        next: () => {
          this.diseases = this.diseases.filter(disease => disease.diseaseId !== diseaseId);
        },
        error: (err) => {
          console.error('Error deleting disease', err);
          alert('فشل حذف المرض. يرجى المحاولة مرة أخرى لاحقًا.');
        }
      });
    }
  }
  
}
