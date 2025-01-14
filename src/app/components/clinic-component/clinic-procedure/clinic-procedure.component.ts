import { MedicalRecordService } from './../../../services/medical-record.service';
import { ProcedureService } from './../../../services/procedure.service';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { MultiSelectDropdownComponent } from "../../shared/dropdown-menu/dropdown-menu.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Procedures } from '../../../interfaces/list.interface';
import { MedicalProcedures } from '../../../interfaces/patient.interface';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";

@Component({
  selector: 'app-clinic-procedure',
  standalone: true,
  imports: [MultiSelectDropdownComponent, CommonModule, FormsModule, LoadingImageComponent],
  templateUrl: './clinic-procedure.component.html',
  styleUrl: './clinic-procedure.component.css'
})
export class ClinicProcedureComponent implements OnInit {

  @Input() medicalProcedures: MedicalProcedures = {};
  @Input() patientType: string ='';
  @Input() medicalRecordId: number = 0;

  selectedProcedures: string[] = [];
  disable = false;
  BPChecked = false;
  TempChecked = false;
  PulseChecked = false;
  RespChecked = false;
  hasChecked = false;

  private readonly procedureService = inject(ProcedureService);
  private readonly medicalRecordService = inject(MedicalRecordService);
  procedureNames: string[] = [];
  errorMessage = '';
  saving = false;

  ngOnInit(): void {
    this.getAllProcedures();
    if (this.medicalProcedures) {
      this.selectedProcedures = this.medicalProcedures.procedures || [];
      this.BPChecked = this.medicalProcedures.bpState || false;
      this.TempChecked = this.medicalProcedures.tempState || false;
      this.RespChecked = this.medicalProcedures.respState || false;
      this.PulseChecked = this.medicalProcedures.pulseState || false;
    }
    // Check for any predefined medical procedure values
    if (
      this.medicalProcedures?.bpUpValue ||
      this.medicalProcedures?.tempValue ||
      this.medicalProcedures?.respValue ||
      this.medicalProcedures?.pulseValue
    ) {
      this.hasChecked = true;
      this.disable=true;
    }
  }

  onNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9^.]/g, '');
  }

  onChangeProcedures(selected: string[]): void {
    this.selectedProcedures = [...selected];
  }

  onSubmit(): void {

  this.disable = !this.disable;
    this.saving = true;
    if (!this.BPChecked && !this.TempChecked &&
      !this.RespChecked && !this.PulseChecked &&
      !this.selectedProcedures
    ) {
      this.errorMessage = 'يرجى أختيار على الأقل فحص واحد';
      this.saving = false;
    }
let newPatientType ='';
if(this.patientType=='عيادة')
  {
    newPatientType='تحويل  من العيادة';
  }



    const user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;

    if (!parsedUser) {
      alert('User not found in session. Please login again.');
      this.saving = false;
      return;
    }

    const requestMedicalProcedures: MedicalProcedures = {
      medicalProceduresId: this.medicalRecordId,
      nurseId: '',
      doctorId: parsedUser.userId,
      bpState: this.BPChecked,
      bpUpValue: '',
      bpDownValue:'',
      tempState: this.TempChecked,
      tempValue: '',
      pulseState: this.PulseChecked,
      pulseValue: '',
      respState: this.RespChecked,
      respValue: '',
      procedures: this.selectedProcedures,
    };

    console.log('requestMedicalProcedures', requestMedicalProcedures);

    this.medicalRecordService.addOrUpdateProcedures(this.medicalRecordId, requestMedicalProcedures ,newPatientType).subscribe({
      next: () => {
        this.saving = false;
        console.log('newPatientType', newPatientType);
        alert('Procedure successfully updated!');
      },
      error: (err) => {
        this.saving = false;
        console.error('Error updating procedure', err);
        alert('An error occurred while updating the procedure.');
      },
    });
  }

  getAllProcedures(): void {
    this.procedureService.getAllProcedures().subscribe({
      next: (procedures: Procedures[]) => {
        this.procedureNames = procedures.map((proc) => proc.name ?? '');
      },
      error: (err) => {
        console.error('Error fetching procedures:', err);
      },
    });
  }
}

