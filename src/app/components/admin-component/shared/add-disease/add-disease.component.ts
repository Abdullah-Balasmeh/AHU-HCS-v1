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
  currentDisease: Diseases = { diseaseId: '', name: '' }; // Holds the disease being edited or added

  constructor(private diseaseService: DiseaseService) {}

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
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching diseases', err);
      }
    });
  }

  // Add new disease
  onAdd() {
    if (!this.currentDisease.name.trim()) {
      alert('Please enter a valid disease name.');
      return;
    }

    this.diseaseService.addDisease(this.currentDisease).subscribe({
      next: (newDisease) => {
        this.diseases.push(newDisease);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding disease', err);
        alert('Failed to add disease. Please try again later.');
      }
    });
  }

  // Save edited disease
  onSave() {
    if (!this.currentDisease.name.trim()) {
      alert('Please enter a valid disease name.');
      return;
    }

    this.diseaseService.updateDisease(this.currentDisease.diseaseId, this.currentDisease).subscribe({
      next: () => {
        // Update the local array
        const index = this.diseases.findIndex(d => d.diseaseId === this.currentDisease.diseaseId);
        if (index > -1) {
          this.diseases[index] = { ...this.currentDisease };
        }
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating disease', err);
        alert('Failed to update disease. Please try again later.');
      }
    });
  }

  // Edit existing disease
  Edit(disease: Diseases) {
    this.isEdit = true;
    this.currentDisease = { ...disease };
    console.log(this.currentDisease );
  }

  // Reset form
  resetForm() {
    this.isEdit = false;
    this.currentDisease = { diseaseId: '', name: '' };
  }

  // Delete disease
  deleteDisease(diseaseId: string) {
    if (confirm('Are you sure you want to delete this disease?')) {
      this.diseaseService.deleteDisease(diseaseId).subscribe({
        next: () => {
          this.diseases = this.diseases.filter(disease => disease.diseaseId !== diseaseId);
        },
        error: (err) => {
          console.error('Error deleting disease', err);
          alert('Failed to delete disease. Please try again later.');
        }
      });
    }
  }
  
}
