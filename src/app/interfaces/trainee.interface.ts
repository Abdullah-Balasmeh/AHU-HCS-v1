export interface Trainee {
    traineeId?: string;
    traineeName?: string;
    password?: string;
    supervisor?: string;
    course?: string;
    registDate?: Date;
    userName?: string;
    attendaceRecords?: AttendanceRecord[];
}
export interface AttendanceRecord {
    attendaceRecordId?: number;
    enterDate?: Date;
    leaveDate?: Date;
    traineeId?: string;
}
