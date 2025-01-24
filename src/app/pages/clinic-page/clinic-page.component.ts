import { MedicalRecordService } from './../../services/medical-record.service';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { LoadingImageComponent } from "../../components/shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { ClinicTabComponent } from "../../components/clinic-component/clinic-tab/clinic-tab.component";
import { ReportSectionComponent } from "../../components/clinic-component/report-section/report-section.component";
import { PatientInfoDisplayComponent } from "../../components/patient-components/patient-info-display/patient-info-display.component";
import { ClinicProcedureComponent } from "../../components/clinic-component/clinic-procedure/clinic-procedure.component";
import { PrescriptionComponent } from "../../components/clinic-component/prescription/prescription.component";
import { MedicalRecord } from '../../interfaces/patient.interface';

@Component({
  selector: 'app-clinic-page',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule, ClinicTabComponent, ReportSectionComponent, PatientInfoDisplayComponent, ClinicProcedureComponent, PrescriptionComponent],
  templateUrl: './clinic-page.component.html',
  styleUrl: './clinic-page.component.css'
})
export class ClinicPageComponent implements OnInit {

  isLoading:boolean=false;
  records: MedicalRecord[] = [];
  selectedRecord?: MedicalRecord | null; 
  @Output() resetEvent = new EventEmitter<void>(); 
  selectedTab: string='patient-info';
  showTable: boolean = true;
  showTabs: boolean = false; 
  private readonly medicalRecordService=inject(MedicalRecordService);
  ngOnInit(): void {
    this.loadPatients();
  }

  getLocalDate = (): string => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Get the offset in milliseconds
    const localTime = new Date(now.getTime() - offset); // Adjust for local time
    return localTime.toISOString().split('T')[0]; // Extract the date
};
  loadPatients(): void {
    const today = this.getLocalDate()
    this.isLoading = true;
  
    this.medicalRecordService.getRecordsByEnterDate(today).subscribe({
      next: (records) => {
        const filteredRecords = records.filter((record: MedicalRecord) => (record.patientType === 'عيادة' || record.patientType == 'تحويل من العيادة') );
        // Sort filtered records by enterDate in ascending order
        filteredRecords.sort((a: any, b: any) => new Date(a.enterDate).getTime() - new Date(b.enterDate).getTime());
        this.records = filteredRecords;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
  

  onViewDetails(record : MedicalRecord) {
    this.selectedTab= 'patient-info';
    this.selectedRecord=record;
    this.showTable = false;
    this.showTabs = true;
  }
  
  onTabChange(tab: string) {
    this.selectedTab = tab; // Update the selected tab
  }

  closeAll(): void {
    this.showTable = true;
    this.showTabs = false;
    this.selectedRecord = null;
  }
  
  reset(): void {
    this.resetEvent.emit();
    if (this.showTabs) {
      return;
    }
    this.showTable = true;
    this.showTabs = false;
  }
  
  

}
