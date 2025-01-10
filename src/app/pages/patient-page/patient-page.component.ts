import { Component, inject, signal } from '@angular/core';
import { PatientReportTableComponent } from "../../components/patient-components/patient-report-table/patient-report-table.component";
import { PatientTabComponent } from "../../components/patient-components/patient-tab/patient-tab.component";
import { CommonModule } from '@angular/common';
import { Patient } from '../../interfaces/patient.interface';
import { Router } from '@angular/router';
import { PatientInfoFirstComponent } from "../../components/patient-components/patient-info-first/patient-info-first.component";
import { LogoutBtnComponent } from "../../components/main/logout-btn/logout-btn.component";
import { PatientInfoComponent } from "../../components/patient-components/patient-info/patient-info.component";
import { GlobalStateService } from '../../services/global-state.service';

@Component({
  selector: 'app-patient-page',
  standalone: true,
  imports: [
    PatientTabComponent,
    CommonModule,
    PatientInfoFirstComponent,
    LogoutBtnComponent,
    PatientInfoComponent,
    PatientReportTableComponent
],
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.css']
})
export class PatientPageComponent {
  selectedTab: string = 'patient-info';
  patient: Patient | null = null;
  public isEditing = signal<boolean>(false) ;
  private readonly router = inject(Router);
  globalStateService = inject(GlobalStateService);

  ngOnInit(): void {
    const storedPatient = sessionStorage.getItem('patient');
    if (storedPatient) {
      this.patient = JSON.parse(storedPatient);

      // Check if patient data is missing and show `app-patient-info-first`
      if (this.patient &&!this.patient.bloodType) {
        this.globalStateService.isEditing = true;
      }
    } 
  }

  onDataSaved(updatedPatient: Patient): void {
    this.patient = updatedPatient;
    sessionStorage.setItem('patient', JSON.stringify(this.patient));
    this.globalStateService.isEditing = false; // Switch back to view mode
  }

  onEdit(): void {
    this.globalStateService.isEditing = true; // Enable edit mode
  }

  onLogout(): void {
    const confirmLogout = confirm(
      'Are you sure you want to logout?'
    );
    if(confirmLogout)
      {
        localStorage.removeItem('activePatientSession');
        sessionStorage.removeItem('sessionToken');
        sessionStorage.removeItem('patient');
        this.router.navigate(['/login-patient']);
      }
  }
  

  onTabChange(tab: string): void {
    this.selectedTab = tab;
  }
}
