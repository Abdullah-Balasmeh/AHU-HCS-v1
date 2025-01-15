import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-emergency-tab',
  standalone: true,
  imports: [],
  templateUrl: './emergency-tab.component.html',
  styleUrl: './emergency-tab.component.css'
})
export class EmergencyTabComponent {
  @Output() tabChange = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>(); // Event emitter to notify parent

  closeTab(): void {
    this.close.emit(); // Emit the close event
  }
  selectTab(tab: string) {
      this.tabChange.emit(tab); // Emit the selected tab to the parent
  }
}
