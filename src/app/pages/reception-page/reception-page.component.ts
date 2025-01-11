import { Component } from '@angular/core';
import { ReceptionTabComponent } from "../../components/reception-components/reception-tab/reception-tab.component";
import { PatientRegistComponent } from "../../components/reception-components/patient-regist/patient-regist.component";
import { ReceptionTableComponent } from "../../components/patient-components/reception-table/reception-table.component";
import { QrCodeComponent } from "../../components/reception-components/qr-code/qr-code.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reception-page',
  standalone: true,
  imports: [ReceptionTabComponent, PatientRegistComponent, ReceptionTableComponent, QrCodeComponent,CommonModule],
  templateUrl: './reception-page.component.html',
  styleUrl: './reception-page.component.css'
})
export class ReceptionPageComponent {
  selectedTab: string = 'register-patient'; 

  onTabChange(tab: string) {
      this.selectedTab = tab;
  }
}
