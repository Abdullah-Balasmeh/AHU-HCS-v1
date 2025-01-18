import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-certificate-tab',
  standalone: true,
  imports: [],
  templateUrl: './certificate-tab.component.html',
  styleUrl: './certificate-tab.component.css'
})
export class CertificateTabComponent {
  @Output() tabChange = new EventEmitter<string>();
  @Output() closeTab = new EventEmitter<void>(); // Event to notify parent

  onClose() {
    this.closeTab.emit(); // Emit the event
  }
  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
