import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reception-tab',
  standalone: true,
  imports: [],
  templateUrl: './reception-tab.component.html',
  styleUrl: './reception-tab.component.css'
})
export class ReceptionTabComponent {
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tab: string) {
      this.tabChange.emit(tab);
  }
}
