import { Component, signal } from '@angular/core';
import { ManagerRigestTraineeComponent } from "../../components/manager-component/manager-rigest-trainee/manager-rigest-trainee.component";
import { ManagerOrderTableComponent } from "../../components/manager-component/manager-order-table/manager-order-table.component";
import { ManagerMedicalReportComponent } from "../../components/manager-component/manager-medical-report/manager-medical-report.component";
import { ManagerAnalysisReportComponent } from "../../components/manager-component/manager-analysis-report/manager-analysis-report.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-page',
  standalone: true,
  imports: [ManagerRigestTraineeComponent, ManagerOrderTableComponent, ManagerMedicalReportComponent, ManagerAnalysisReportComponent,CommonModule],
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
