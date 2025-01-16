import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'; 
import { AttendanceRecord } from '../interfaces/trainee.interface';

@Injectable({
  providedIn: 'root',
})
export class AttendanceRecordService {
  private readonly endpoint = 'trainee'; // Base endpoint for trainees

  constructor(private readonly apiService: ApiService) {}

  // Get all attendance records for a specific trainee
  getAttendanceRecordsByTraineeId(traineeId: string): Observable<AttendanceRecord[]> {
    return this.apiService.get<AttendanceRecord[]>(`${this.endpoint}/${traineeId}/attendance`);
  }

  // Add a new attendance record for a specific trainee
  addAttendanceRecord(traineeId: string, record: AttendanceRecord): Observable<AttendanceRecord> {
    return this.apiService.post<AttendanceRecord>(`${this.endpoint}/${traineeId}/attendance`, record);
  }

  // Update an attendance record
  updateAttendanceRecord(recordId: number, record: AttendanceRecord): Observable<AttendanceRecord> {
    return this.apiService.put<AttendanceRecord>(`${this.endpoint}/attendance/${recordId}`, record);
  }

  // Delete an attendance record
  deleteAttendanceRecord(recordId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/attendance/${recordId}`);
  }
}
