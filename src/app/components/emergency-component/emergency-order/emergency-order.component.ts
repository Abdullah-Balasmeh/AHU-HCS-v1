import { Component, EventEmitter, Output} from '@angular/core';
import { EmergencyOrderTabComponent } from "../emergency-order-tab/emergency-order-tab.component";
import { EmergencyOrderStateComponent } from "../emergency-order-state/emergency-order-state.component";
import { CommonModule } from '@angular/common';
import { EmergencyOrderRequestComponent } from "../emergency-order-request/emergency-order-request.component";

@Component({
  selector: 'app-emergency-order',
  standalone: true,
  imports: [EmergencyOrderTabComponent, EmergencyOrderStateComponent, CommonModule, EmergencyOrderRequestComponent],
  templateUrl: './emergency-order.component.html',
  styleUrl: './emergency-order.component.css'
})
export class EmergencyOrderComponent {
  selectedTab: string = 'treatment-order'; 
  @Output() resetEvent = new EventEmitter<void>(); 
  onTabChange(tab: string) {
      this.selectedTab = tab;
  }
  reset(): void {
    this.resetEvent.emit(); 
  }
}
