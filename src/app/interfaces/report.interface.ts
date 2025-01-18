export interface Report{
    reportId?:number,
    reportType?:string,
    patientName?:string,
    patientId?:string,
    date?:string,
    day?:string,
    enterTime?:string,
    leaveTime?:Date,
    recommendation?:string,
    doctorName?:string,
    description?:string,
    clinicName?:string,
    hospitalName?:string
}