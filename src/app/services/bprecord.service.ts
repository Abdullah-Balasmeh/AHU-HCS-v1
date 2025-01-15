import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'; // Adjust the path as needed
import { BPRecord } from '../interfaces/patient.interface';


@Injectable({
  providedIn: 'root',
})
export class BPRecordService {
  private readonly endpoint = 'bp-records'; // API endpoint for BP records

  constructor(private readonly apiService: ApiService) {}

  // Get all BP records by patient ID
  getBPRecordsByPatientId(patientId: string): Observable<BPRecord[]> {
    return this.apiService.get<BPRecord[]>(`${this.endpoint}/${patientId}`);
  }

  // Add a new BP record
  addBPRecord(patientId: string, record: BPRecord): Observable<BPRecord> {
    return this.apiService.post<BPRecord>(`${this.endpoint}?patientId=${patientId}`, record);
  }

  // Update an existing BP record
  updateBPRecord(recordId: number, record: BPRecord): Observable<BPRecord> {
    return this.apiService.put<BPRecord>(`${this.endpoint}/${recordId}`, record);
  }

  // Delete a BP record by ID
  deleteBPRecord(recordId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${recordId}`);
  }
}
