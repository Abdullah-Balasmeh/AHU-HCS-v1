import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pharmacy-tab',
  standalone: true,
  imports: [],
  templateUrl: './pharmacy-tab.component.html',
  styleUrl: './pharmacy-tab.component.css'
})
export class PharmacyTabComponent {
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
