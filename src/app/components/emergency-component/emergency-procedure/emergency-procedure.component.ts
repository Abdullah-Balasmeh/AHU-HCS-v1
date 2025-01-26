import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Procedures } from '../../../interfaces/list.interface';
import { MedicalProcedures } from '../../../interfaces/patient.interface';
import { MedicalRecordService } from '../../../services/medical-record.service';
import { ProcedureService } from '../../../services/procedure.service';
import { CommonModule } from '@angular/common';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { MultiSelectDropdownComponent } from "../../shared/dropdown-menu/dropdown-menu.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emergency-procedure',
  standalone: true,
  imports: [CommonModule, LoadingImageComponent, MultiSelectDropdownComponent,FormsModule],
  templateUrl: './emergency-procedure.component.html',
  styleUrl: './emergency-procedure.component.css'
})
export class EmergencyProcedureComponent {
  @Output() close = new EventEmitter<void>();
  @Input() medicalProcedures: MedicalProcedures = {
    bpUpValue: '',
    bpDownValue: '',
    tempValue: '',
    pulseValue: '',
    respValue: '',
    bpState: false,
    tempState: false,
    pulseState: false,
    respState: false,
    procedures: [],
  };
  
  @Input() patientType: string ='';
  @Input() medicalRecordId: number = 0;

  selectedProcedures: string[] = [];
  BPChecked = false;
  TempChecked = false;
  PulseChecked = false;
  RespChecked = false;

  hasChecked = false;
  disable = false;

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
      this.medicalProcedures.bpUpValue ||
      this.medicalProcedures.tempValue ||
      this.medicalProcedures.respValue ||
      this.medicalProcedures.pulseValue
    ) {
      this.hasChecked = true;
      this.disable=true;
    }
  }
  ngOnChanges(): void {
    // Fallback to default values if undefined
    this.medicalProcedures = this.medicalProcedures || {
      bpUpValue: '',
      bpDownValue: '',
      tempValue: '',
      pulseValue: '',
      respValue: '',
      bpState: false,
      tempState: false,
      pulseState: false,
      respState: false,
      procedures: [],
    };
  }
  
  onNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9^.]/g, '');
  }

  onChangeProcedures(selected: string[]): void {
    this.selectedProcedures = [...selected];
  }

  onSubmit(): void {
    this.errorMessage='';
    this.saving = true;
    if (!this.BPChecked && !this.TempChecked &&
      !this.RespChecked && !this.PulseChecked &&
      this.selectedProcedures.length==0
    ) {
      this.errorMessage = 'يرجى أختيار على الأقل فحص واحد';
      this.saving = false;
      return;
    }
    if (
      (this.medicalProcedures.bpState && ((this.medicalProcedures.bpUpValue == '' || undefined )|| (this.medicalProcedures.bpDownValue == ''|| undefined) )) ||
      (this.medicalProcedures.tempState && (this.medicalProcedures.tempValue  == '' || undefined)) ||
      (this.medicalProcedures.respState && (this.medicalProcedures.respValue == ''|| undefined ))||
      (this.medicalProcedures.pulseState && (this.medicalProcedures.pulseValue == '' || undefined)) ||
      this.medicalProcedures.procedures?.length==0
    )
      {
        this.errorMessage='يرجى تعبئة الحقول';
        this.saving = false;
        return;
      }
let newPatientType ='';
if(this.patientType=='طوارئ')
  {
    newPatientType="عيادة";
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
      nurseId: parsedUser.userId,
      doctorId: parsedUser.userId,
      bpState: this.BPChecked,
      bpUpValue: this.medicalProcedures.bpUpValue,
      bpDownValue:this.medicalProcedures.bpDownValue,
      tempState: this.TempChecked,
      tempValue: this.medicalProcedures.tempValue,
      pulseState: this.PulseChecked,
      pulseValue: this.medicalProcedures.pulseValue,
      respState: this.RespChecked,
      respValue: this.medicalProcedures.respValue,
      procedures: this.selectedProcedures,
    };

    console.log('requestMedicalProcedures', requestMedicalProcedures);

    this.medicalRecordService.addOrUpdateProcedures(this.medicalRecordId, requestMedicalProcedures ,newPatientType).subscribe({
      next: () => {
        this.saving = false;
        this.close.emit();
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
        this.procedureNames = [
          ...this.selectedProcedures,
          ...procedures.map((proc) => proc.name ?? ''),
        ]
      },
      error: (err) => {
        console.error('Error fetching procedures:', err);
      },
    });
  }
}
