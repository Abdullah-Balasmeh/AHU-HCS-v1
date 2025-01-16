import { Data } from "@angular/router";

export interface MedicalRecord {
    medicalRecordId: number;
    userId: string;
    enterDate: string;
    leaveDate?: string;
    patientType: string;
    patient: Patient;
    prescription?: Prescription;
    medicalProcedures?: MedicalProcedures;
}

export interface Patient {
    patientId?: string;
    patientName?: string;
    gender?: string;
    patientClass?: string;
    bloodType?: string;
    allergy?: string[];
    chDisease?: string[];
    medicine?: string[];
    takeVac?: boolean;
    vacName?: string;
    vacType?: string;
    vacData?: string;
    reports?: Report[];
    bpRecords?: BPRecord[];
    diabtetesRecords?: DiabtetesRecord[];
}

export interface Report {
    reportId: number;
    reportType?: string;
    decription?: string;
    disease?: string;
    userId?: string;
    date?: string;
    patientId?: string;
}

export interface BPRecord {
    bpRecordId?: number;
    bpUp?: string;
    bpDown?: string;
    note?: string;
    date?: string;
    patientId?: string;
    formattedDate?: {
        date: string;
        time: string;
        day: string;
    };
}


export interface DiabtetesRecord {
    diabtetesRecordId?: number;
    fbs?: string;
    rbs?: string;
    note?: string;
    date?: string;
    patientId?: string;
    formattedDate?: {
        date: string;
        time: string;
        day: string;
    };
}

export interface Prescription {
    prescriptionId?: number;
    disease?: string[];
    medicine?: string[];
    userId?: string;
    date?: Data;
    medicalRecordId?: number;
}

export interface MedicalProcedures {
    medicalProceduresId?: number;
    nurseId?: string;
    doctorId?: string;
    bpState?: boolean;
    bpUpValue?: string;
    bpDownValue?: string;
    tempState?: boolean;
    tempValue?: string;
    pulseState?: boolean;
    pulseValue?: string;
    respState?: boolean;
    respValue?: string;
    procedures?: string[];
    medicalRecord?: string;
}
