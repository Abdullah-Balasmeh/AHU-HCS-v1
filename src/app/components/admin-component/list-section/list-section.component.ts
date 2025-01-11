import { Component, EventEmitter, Output } from '@angular/core';
import { AddMedicineComponent } from "../shared/add-medicine/add-medicine.component";
import { AddDiseaseComponent } from "../shared/add-disease/add-disease.component";
import { AddAllergyComponent } from "../shared/add-allergy/add-allergy.component";
import { ListTabComponent } from "../shared/list-tab/list-tab.component";
import { CommonModule } from '@angular/common';
import { AddProcedureComponent } from "../shared/add-procedure/add-procedure.component";

@Component({
  selector: 'app-list-section',
  standalone: true,
  imports: [AddMedicineComponent, AddDiseaseComponent, AddAllergyComponent, ListTabComponent, CommonModule, AddProcedureComponent],
  templateUrl: './list-section.component.html',
  styleUrl: './list-section.component.css'
})
export class ListSectionComponent {
  @Output() resetEvent = new EventEmitter<void>(); 

  selectedTab: string = 'add-medicine'; 

  onTabChange(tab: string) {
    this.selectedTab = tab; 
  }

  onClose() {
    this.resetEvent.emit(); 
  }
}
