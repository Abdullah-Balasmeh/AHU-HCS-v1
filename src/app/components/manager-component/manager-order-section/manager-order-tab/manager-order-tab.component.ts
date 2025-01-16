import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-manager-order-tab',
  standalone: true,
  imports: [],
  templateUrl: './manager-order-tab.component.html',
  styleUrl: './manager-order-tab.component.css'
})
export class ManagerOrderTabComponent {
  @Output() closeTab = new EventEmitter<void>(); 
  @Output() tabChange = new EventEmitter<string>();
  onClose() {
    this.closeTab.emit();
  }
  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
