import { Component, signal } from '@angular/core';
import { EmployeeSectionComponent } from "../../components/admin-component/employee-section/employee-section.component";
import { CommonModule } from '@angular/common';
import { ListSectionComponent } from "../../components/admin-component/list-section/list-section.component";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [EmployeeSectionComponent, CommonModule, ListSectionComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  selectedCard =signal <string | null >(null);


  showComponent(card: string): void {
    this.selectedCard.set(card) ;
  }

  handleReset(): void {
    this.selectedCard.set(null);
  }
}
