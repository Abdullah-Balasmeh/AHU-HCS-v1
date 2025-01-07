export interface Patient {
    patientId?: string;
    patientName?: string;
    password?: string ;
    gender?: string | null;
    patientClass?: string | null;
    hasData?:boolean;
    bloodType?: string | null;
    allergy?: string[] | null;
    chDisease?: string[] | null; 
    medicine?: string[] | null; 
    takeVac?: boolean;
    vacName?: string | null;
    vacType?: string | null;
    vacData?: string | null; 
    medicalRecords?: any[];
    reports?: any[];
    bpRecords?: any[];
    diabetesRecords?: any[]; 
}
