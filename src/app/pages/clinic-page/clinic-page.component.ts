import { MedicalRecordService } from './../../services/medical-record.service';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { LoadingImageComponent } from "../../components/shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { ClinicTabComponent } from "../../components/clinic-component/clinic-tab/clinic-tab.component";
import { ReportSectionComponent } from "../../components/clinic-component/report-section/report-section.component";
import { PatientInfoDisplayComponent } from "../../components/patient-components/patient-info-display/patient-info-display.component";
import { ClinicProcedureComponent } from "../../components/clinic-component/clinic-procedure/clinic-procedure.component";
import { PrescriptionComponent } from "../../components/clinic-component/prescription/prescription.component";
import { Patient } from '../../interfaces/patient.interface';

@Component({
  selector: 'app-clinic-page',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule, ClinicTabComponent, ReportSectionComponent, PatientInfoDisplayComponent, ClinicProcedureComponent, PrescriptionComponent],
  templateUrl: './clinic-page.component.html',
  styleUrl: './clinic-page.component.css'
})
export class ClinicPageComponent implements OnInit {

  isLoading:boolean=false;
  patients: any[] = [];
  selectedPatient: Patient | undefined; 
  @Output() resetEvent = new EventEmitter<void>(); 
  selectedTab: string='patient-info';
  showTable: boolean = true;
  showTabs: boolean = false; 
  private readonly medicalRecordService=inject(MedicalRecordService);
  ngOnInit(): void {
    this.loadPatients();
  }
  loadPatients(): void {
    const now = new Date();
    const offset = now.getTimezoneOffset(); // Get timezone offset in minutes
    const localDate = new Date(now.getTime() - offset * 60 * 1000).toISOString();
    this.isLoading = true;
  
    this.medicalRecordService.getRecordsByEnterDate(localDate).subscribe({
      next: (records) => {
        const filteredRecords = records.filter((record: any) => record.patientType === 'عيادة');
  
        // Sort filtered records by enterDate in ascending order
        filteredRecords.sort((a: any, b: any) => new Date(a.enterDate).getTime() - new Date(b.enterDate).getTime());
  
        // Map sorted and filtered records to patients
        this.patients = filteredRecords.map((record: any) => ({
          name: record.patient?.patientName || 'N/A',
          id: record.patient?.patientId || 'N/A',
          class: record.patient?.patientClass || 'N/A',
          type: record.patientType || 'N/A',
          recordId: record.medicalRecordId,
          enterDate: record.enterDate,
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching records:', error);
        this.isLoading = false;
      },
    });
  }
  

  onViewDetails(patient : any) {
    this.selectedTab= 'patient-info';
    this.selectedPatient=patient;
    this.showTable = false;
    this.showTabs = true;
  }
  reset(): void {
    this.resetEvent.emit(); // Emit the renamed `resetEvent`
  }

  onTabChange(tab: string) {
    this.selectedTab = tab; // Update the selected tab
  }
  closeAll(): void {
    this.showTable = true;
    this.showTabs = false;
  }


}
