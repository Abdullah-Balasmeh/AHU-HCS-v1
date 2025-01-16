import { Component, EventEmitter, Output } from '@angular/core';
import { ManagerRigestTraineeTabComponent } from "./manager-rigest-trainee-tab/manager-rigest-trainee-tab.component";
import { ManagerRigestTraineeFormComponent } from "./manager-rigest-trainee-form/manager-rigest-trainee-form.component";
import { ManagerRigestTraineeTableComponent } from "./manager-rigest-trainee-table/manager-rigest-trainee-table.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-rigest-trainee',
  standalone: true,
  imports: [ManagerRigestTraineeTabComponent, ManagerRigestTraineeFormComponent, ManagerRigestTraineeTableComponent,CommonModule],
  templateUrl: './manager-rigest-trainee.component.html',
  styleUrl: './manager-rigest-trainee.component.css'
})
export class ManagerRigestTraineeComponent {
 @Output() resetEvent = new EventEmitter<void>(); // Notify parent to reset the view

  selectedTab: string = 'trainee-rigest'; // Default tab

  onTabChange(tab: string) {
    this.selectedTab = tab; // Update the selected tab
  }

  onClose() {
    this.resetEvent.emit(); // Emit event when close is clicked
  }
}
