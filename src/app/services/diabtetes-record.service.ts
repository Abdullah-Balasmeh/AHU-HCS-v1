import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'; // Adjust the path as needed
import { DiabtetesRecord } from '../interfaces/patient.interface';



@Injectable({
  providedIn: 'root',
})
export class DiabtetesRecordService {
  private readonly endpoint = 'diabetes-records'; // API endpoint for diabetes records

  constructor(private readonly apiService: ApiService) {}

  // Get all diabetes records by patient ID
  getDiabtetesRecordsByPatientId(patientId: string): Observable<DiabtetesRecord[]> {
    return this.apiService.get<DiabtetesRecord[]>(`${this.endpoint}/${patientId}`);
  }

  // Add a new diabetes record
  addDiabtetesRecord(patientId: string,record: DiabtetesRecord): Observable<DiabtetesRecord> {
    return this.apiService.post<DiabtetesRecord>(`${this.endpoint}?patientId=${patientId}`, record);
  }

  // Update an existing diabetes record
  updateDiabtetesRecord(recordId: number, record: DiabtetesRecord): Observable<DiabtetesRecord> {
    return this.apiService.put<DiabtetesRecord>(`${this.endpoint}/${recordId}`, record);
  }

  // Delete a diabetes record by ID
  deleteDiabtetesRecord(recordId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${recordId}`);
  }
}
