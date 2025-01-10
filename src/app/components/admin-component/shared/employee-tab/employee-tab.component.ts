import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-employee-tab',
  standalone: true,
  imports: [],
  templateUrl: './employee-tab.component.html',
  styleUrl: './employee-tab.component.css'
})
export class EmployeeTabComponent {
  @Output() closeTab = new EventEmitter<void>(); // Event to notify parent
  @Output() tabChange = new EventEmitter<string>();
  onClose() {
    this.closeTab.emit(); // Emit the event
  }
  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
