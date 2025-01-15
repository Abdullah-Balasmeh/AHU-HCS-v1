import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MedicalRecordService } from '../../../services/medical-record.service';
import { MedicalRecord } from '../../../interfaces/patient.interface';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { PatientInfoDisplayComponent } from "../../patient-components/patient-info-display/patient-info-display.component";
import { CommonModule } from '@angular/common';
import { EmergencyTabComponent } from "../emergency-tab/emergency-tab.component";
import { EmergencyProcedureComponent } from "../emergency-procedure/emergency-procedure.component";
import { FollowingTabComponent } from "../following-tab/following-tab.component";
import { BpTableComponent } from "../bp-table/bp-table.component";
import { DiabetesTableComponent } from "../diabetes-table/diabetes-table.component";

@Component({
  selector: 'app-emergency-table',
  standalone: true,
  imports: [LoadingImageComponent, PatientInfoDisplayComponent, CommonModule, EmergencyTabComponent, EmergencyProcedureComponent, FollowingTabComponent, BpTableComponent, DiabetesTableComponent],
  templateUrl: './emergency-table.component.html',
  styleUrl: './emergency-table.component.css'
})
export class EmergencyTableComponent {
  private readonly medicalRecordService=inject(MedicalRecordService);
  @Output() resetEvent = new EventEmitter<void>(); 
  isLoading:boolean=false;
  records: MedicalRecord[] = [];
  selectedRecord?: MedicalRecord | null; 
  selectedTab: string='patient-info';
  showTable: boolean = true;
  showTabs: boolean = false; 
  showEmergencyDialog: boolean = false; // Controls visibility of Emergency Dialog
  showFollowingTab: boolean = false;
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
      next: (records : MedicalRecord[]) => {
        const filteredRecords = records.filter((record: MedicalRecord) => 
        (record.patientType === 'طوارئ' || record.patientType  === 'متابعة الضغط/السكري' ||  record.patientType ==="تحويل من العيادة") &&
        record.patient.gender === 'Male');
  
        // Sort filtered records by enterDate in ascending order
        filteredRecords.sort((a: any, b: any) => new Date(a.enterDate).getTime() - new Date(b.enterDate).getTime());
        this.records = filteredRecords;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching records:', error);
        this.isLoading = false;
      },
    });
  }

  onViewDetails(record : MedicalRecord) {
    this.selectedTab= 'patient-info';
    console.log('selectedRecord ' , record)
    this.selectedRecord=record;
    this.showTable = false;
    this.showEmergencyDialog = true;
    this.showFollowingTab = false;
  }
  
  openFollowingTab(patient: any): void {
    this.selectedTab= 'B.P';
    this.showTable = false;
    this.showFollowingTab = true;
    this.showEmergencyDialog = false;
  }
  reset(): void {
    this.resetEvent.emit(); 
  }
  onTabChange(tab: string) {
    this.selectedTab = tab; // Update the selected tab
  }
  closeAll(): void {
    this.showTable = true;
    this.showEmergencyDialog = false;
    this.showFollowingTab = false;
  }

}
