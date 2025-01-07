export interface User {
    id: string;
    name: string;
    password:string;
    roleID: string[] | string;
}
export interface Role {
    roleID: string;
    roleName: string;
}

export interface Patient {
    id: string;
    name: string;
    password?:string;
    gender: "Male" | "Female";
    state:string;
    status: string;
    type:string;
    date:{enterDate:string , leaveDate:string}
    medicalRecord: MedicalRecord;
}

export interface MedicalRecord {
    bloodType: string;
    medicalHistory: string[];
    allergies: string[];
    medications: string[];
    clinicProcedures:string[];
    emergencyProcedures: EmergencyProcedures;
    followReadings: FollowReadings;
    prescription: Prescription;
    medicalReport: MedicalReport;
}

export interface EmergencyProcedures {
    BP: {
        "BP-Up": string;
        "BP-Down": string;
    };
    temp: string;
    pulse: string;
    resp: string;
    procedures: string[];
}

export interface FollowReadings {
    BP: Array<{
        "BP-Up": string;
        "BP-Down": string;
        date:{
            day:string;
            dayDate:string;
            Time:string;
        }
        note: string;
    }>;
    diabetes: Array<{
        FBS: string;
        RBS: string;
        date:{
            day:string;
            dayDate:string;
            Time:string;
        }
        note: string;
    }>;
}

export interface Prescription {
    medicalCondition: string[];
    medicine: string[];
    dosage: string;
}
export interface MedicalReport{
    reportName: string;
    medicalCondition: string[];
    recommendations: string[];

}