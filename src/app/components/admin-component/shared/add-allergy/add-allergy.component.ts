import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";

@Component({
  selector: 'app-add-allergy',
  standalone: true,
  imports: [CommonModule, LoadingImageComponent],
  templateUrl: './add-allergy.component.html',
  styleUrl: './add-allergy.component.css'
})
export class AddAllergyComponent {
  isLoading=false;
}
