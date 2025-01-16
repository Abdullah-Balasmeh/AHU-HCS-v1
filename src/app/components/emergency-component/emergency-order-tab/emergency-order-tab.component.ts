import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-emergency-order-tab',
  standalone: true,
  imports: [],
  templateUrl: './emergency-order-tab.component.html',
  styleUrl: './emergency-order-tab.component.css'
})
export class EmergencyOrderTabComponent {
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
