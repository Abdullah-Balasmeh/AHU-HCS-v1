import { Component, signal } from '@angular/core';
import { ManagerRigestTraineeComponent } from "../../components/manager-component/manager-rigest-trainee/manager-rigest-trainee.component";
import { ManagerMedicalReportComponent } from "../../components/manager-component/manager-medical-report/manager-medical-report.component";
import { CommonModule } from '@angular/common';
import { ManagerOrderSectionComponent } from "../../components/manager-component/manager-order-section/manager-order-section.component";

@Component({
  selector: 'app-manager-page',
  standalone: true,
  imports: [ManagerRigestTraineeComponent, ManagerMedicalReportComponent, CommonModule, ManagerOrderSectionComponent],
  templateUrl: './manager-page.component.html',
  styleUrl: './manager-page.component.css'
})
export class ManagerPageComponent {
  selectedCard =signal <string | null >(null);


  showComponent(card: string): void {
    this.selectedCard.set(card) ;
  }


  handleReset(): void {
    this.selectedCard.set(null);
  }
}
