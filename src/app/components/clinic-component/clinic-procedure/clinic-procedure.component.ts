import { MedicalRecordService } from './../../../services/medical-record.service';
import { ProcedureService } from './../../../services/procedure.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MultiSelectDropdownComponent } from "../../shared/dropdown-menu/dropdown-menu.component";
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Procedures } from '../../../interfaces/list.interface';
import { Patient } from '../../../interfaces/patient.interface';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";

@Component({
  selector: 'app-clinic-procedure',
  standalone: true,
  imports: [MultiSelectDropdownComponent, CommonModule, FormsModule, LoadingImageComponent],
  templateUrl: './clinic-procedure.component.html',
  styleUrl: './clinic-procedure.component.css'
})
export class ClinicProcedureComponent implements OnInit {
  ngOnInit(): void {
    this.getAllProcedures();
  }
  @Input() patient: Patient  = {};
  selectedProcedures:string[]=[];
  sendProcedure=false;
  BPChecked = false;
  TempChecked = false;
  PulseChecked = false;
  RespChecked = false;
  hasChecked   = false;
private readonly procedureService =inject(ProcedureService);
private readonly medicalRecordService =inject(MedicalRecordService);
procedureNames: string[] = [];
errorMessage='';
saving=false;
  // Handle numeric input sanitization
  onNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9^.]/g, '');
  }


  onSubmit(form: NgForm):void{
    this.saving=true;
    if(form.invalid)
      {
        this.errorMessage='يرجى أختيار على الأقل فحص واحد';
        return;
      }
      const user = sessionStorage.getItem('user');
      const parsedUser = user ? JSON.parse(user) : null;

      const updatedRecord = {

  leaveDate: null,
  patientType: this.patient.patientClass,
  patientId: this.patient.patientId,
  medicalProcedures: {
    medicalProceduresId: null,
    nurseId: '',
    doctorId: parsedUser.userId,
    bpState: this.BPChecked,
    bpUpValue: '',
    bpDownValue: '',
    tempState:this.TempChecked ,
    tempValue: '',
    pulseState: this.PulseChecked,
    pulseValue: '',
    respState: this.RespChecked,
    respValue: '',
    procedures: this.selectedProcedures,
  },
};

this.medicalRecordService.updateMedicalRecord(1, updatedRecord).subscribe({
  next: () => {
    this.saving=false;
    
  },
  error: (err) => console.error('Error updating record', err),
});

  }




  getAllProcedures():void{
    this.procedureService.getAllProcedures().subscribe({
      next: (procedures: Procedures[]) => {
        this.procedureNames = procedures.map(proc => proc.name || '');
      },
    })
  }
}
