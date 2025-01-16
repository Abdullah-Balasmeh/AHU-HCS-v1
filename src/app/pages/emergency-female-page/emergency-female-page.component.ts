import { Component, signal } from '@angular/core';
import { EmergencyTableComponent } from "../../components/emergency-component/emergency-table/emergency-table.component";
import { EmergencyOrderComponent } from "../../components/emergency-component/emergency-order/emergency-order.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emergency-female-page',
  standalone: true,
  imports: [EmergencyTableComponent, EmergencyOrderComponent,CommonModule],
  templateUrl: './emergency-female-page.component.html',
  styleUrl: './emergency-female-page.component.css'
})
export class EmergencyFemalePageComponent {
  selectedCard = signal<string | null >(null);

  // Show the component based on the card clicked
  showComponent(card: string): void {
    this.selectedCard.set(card) ;
  }

  // Reset to show the cards again
  handleReset(): void {
    this.selectedCard.set(null);
  }
}
