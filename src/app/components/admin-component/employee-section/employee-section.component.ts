import { Component, EventEmitter, Output } from '@angular/core';
import { EmployeeTabComponent } from "../shared/employee-tab/employee-tab.component";
import { EmployeeRegistComponent } from "../shared/employee-regist/employee-regist.component";
import { EmployeeTableComponent } from "../shared/employee-table/employee-table.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-section',
  standalone: true,
  imports: [EmployeeTabComponent, EmployeeRegistComponent, EmployeeTableComponent , CommonModule],
  templateUrl: './employee-section.component.html',
  styleUrl: './employee-section.component.css'
})
export class EmployeeSectionComponent {
  @Output() resetEvent = new EventEmitter<void>();

  selectedTab: string = 'employee-regist';

  onTabChange(tab: string) {
    this.selectedTab = tab;
  }

  onClose() {
    this.resetEvent.emit(); 
  }
}
