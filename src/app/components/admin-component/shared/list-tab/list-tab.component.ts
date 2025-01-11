import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-tab',
  standalone: true,
  imports: [],
  templateUrl: './list-tab.component.html',
  styleUrl: './list-tab.component.css'
})
export class ListTabComponent {
  @Output() closeTab = new EventEmitter<void>();
  @Output() tabChange = new EventEmitter<string>();
  onClose() {
    this.closeTab.emit();
  }
  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
