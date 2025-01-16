import { Component, EventEmitter, Output } from '@angular/core';
import { ManagerOrderTableComponent } from "./manager-order-table/manager-order-table.component";
import { ManagerOrderTabComponent } from "./manager-order-tab/manager-order-tab.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-order-section',
  standalone: true,
  imports: [ManagerOrderTableComponent, ManagerOrderTabComponent,CommonModule],
  templateUrl: './manager-order-section.component.html',
  styleUrl: './manager-order-section.component.css'
})
export class ManagerOrderSectionComponent {
  selectedTab: string = 'male-order';
  @Output() resetEvent = new EventEmitter<void>();

  onTabChange(tab: string) {
    this.selectedTab = tab; // Update the selected tab
  }

  onClose() {
    this.resetEvent.emit(); // Emit event when close is clicked
  }
  }

