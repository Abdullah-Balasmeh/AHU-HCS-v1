import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-following-tab',
  standalone: true,
  imports: [],
  templateUrl: './following-tab.component.html',
  styleUrl: './following-tab.component.css'
})
export class FollowingTabComponent {
  @Output() tabChange = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>(); // Event emitter to notify parent

  closeTab(): void {
    this.close.emit(); // Emit the close event
  }
  selectTab(tab: string) {
      this.tabChange.emit(tab); // Emit the selected tab to the parent
  }
}
