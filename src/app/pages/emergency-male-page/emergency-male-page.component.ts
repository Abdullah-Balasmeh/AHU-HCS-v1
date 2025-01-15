import { CommonModule } from "@angular/common";
import { Component , signal} from "@angular/core";
import { EmergencyTableComponent } from "../../components/emergency-component/emergency-table/emergency-table.component";



@Component({
  selector: 'app-emergency-male-page',
  standalone: true,
  imports: [CommonModule, EmergencyTableComponent],
  templateUrl: './emergency-male-page.component.html',
  styleUrl: './emergency-male-page.component.css'
})
export class EmergencyMalePageComponent {
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

