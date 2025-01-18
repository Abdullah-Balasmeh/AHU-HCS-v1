import { Component, EventEmitter, Output } from '@angular/core';
import { CertificateTabComponent } from "./certificate-component/certificate-tab/certificate-tab.component";
import { CertificateRegistComponent } from "./certificate-component/certificate-regist/certificate-regist.component";
import { CertificateTableComponent } from "./certificate-component/certificate-table/certificate-table.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-medical-report',
  standalone: true,
  imports: [CertificateTabComponent, CertificateRegistComponent, CertificateTableComponent,CommonModule],
  templateUrl: './manager-medical-report.component.html',
  styleUrl: './manager-medical-report.component.css'
})
export class ManagerMedicalReportComponent {
  @Output() resetEvent = new EventEmitter<void>();
  selectedTab: string = 'regist-certificate'; // Default tab

  onTabChange(tab: string) {
      this.selectedTab = tab; // Update the selected tab
  }
  onClose() {
    this.resetEvent.emit(); // Emit event when close is clicked
  }
}
