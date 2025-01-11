import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";

@Component({
  selector: 'app-add-disease',
  standalone: true,
  imports: [CommonModule, LoadingImageComponent],
  templateUrl: './add-disease.component.html',
  styleUrl: './add-disease.component.css'
})
export class AddDiseaseComponent {
  isLoading=false;
}
