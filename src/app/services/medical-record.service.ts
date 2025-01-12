import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiService } from './api.service'; // Import the generic ApiService

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordService {
  private readonly endpoint = 'MedicalRecord';

  constructor(private readonly apiService: ApiService) {}

  getRecordsByEnterDate(date: string): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/byDate?date=${date}`);
  }


  getRecordsByPatientId(patientId: string): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/byPatient/${patientId}`);
  }


  addMedicalRecord(record: any): Observable<any> {
    return this.apiService.post<any>(this.endpoint, record).pipe(
      map((response) => {
        if (response === null) {
          console.warn('No content received from the server.');
          return { message: 'Medical record added, but no response from the server.' };
        }
        return response;
      }),
      catchError((error) => {
        console.error('Error while adding medical record:', error);
        return throwError(() => new Error('Failed to add medical record.'));
      })
    );
  }
  


  updateMedicalRecord(id: string, updatedRecord: any): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}/${id}`, updatedRecord);
  }

  deleteMedicalRecord(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  getStudentState(studentId: string): Observable<any> {
    return this.apiService.get<any>(`EmpOrStudState/student/${studentId}`);
  }

  getEmployeeState(employeeId: string): Observable<any> {
    return this.apiService.get<any>(`EmpOrStudState/employee/${employeeId}`);
  }
}
