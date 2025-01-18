export interface VaccCertificat {
    vaccCertificatnId?: number;
    reportType?:string
    studentId?: string;
    managerName?: string;
    dose?: string;
    date?: Date | string;
    day?:Date | string,
    enterTime?:Date|string,
    leaveTime?:Date|string,
    major?: string;
    college?: string;
    studentName?: string;
}
export interface VaccDipen {
    reportType?:string
    vaccDipenId?: number;
    studentId?: string;
    studentName?: string;
    college?: string;
    major?: string;
    doctorName?: string;
    dose?: string;
    date?: string | Date; 
    day?:Date | string,
    enterTime?:Date|string,
    leaveTime?:Date|string,
}
