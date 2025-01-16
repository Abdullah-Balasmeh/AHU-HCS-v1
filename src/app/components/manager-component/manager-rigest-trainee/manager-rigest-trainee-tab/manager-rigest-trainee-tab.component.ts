import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-manager-rigest-trainee-tab',
  standalone: true,
  imports: [],
  templateUrl: './manager-rigest-trainee-tab.component.html',
  styleUrl: './manager-rigest-trainee-tab.component.css'
})
export class ManagerRigestTraineeTabComponent {
  @Output() closeTab = new EventEmitter<void>(); // Event to notify parent
  @Output() tabChange = new EventEmitter<string>();
  onClose() {
    this.closeTab.emit(); // Emit the event
  }
  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
