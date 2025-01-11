import { Component } from '@angular/core';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reception-table',
  standalone: true,
  imports: [LoadingImageComponent,CommonModule],
  templateUrl: './reception-table.component.html',
  styleUrl: './reception-table.component.css'
})
export class ReceptionTableComponent {
  isLoading=false
}
