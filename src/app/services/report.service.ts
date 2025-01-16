import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly endpoint = 'reports';

  constructor(private readonly apiService: ApiService) {}

  // Get all reports
  getReports(): Observable<any> {
    return this.apiService.get<any>(this.endpoint);
  }

  // Get a specific report by ID
  getReportById(reportId: number): Observable<any> {
    return this.apiService.get<any>(`${this.endpoint}/${reportId}`);
  }

  // Create a new report
  createReport(reportData: any): Observable<any> {
    return this.apiService.post<any>(this.endpoint, reportData);
  }

  // Update an existing report
  updateReport(reportId: number, reportData: any): Observable<any> {
    return this.apiService.put<any>(`${this.endpoint}/${reportId}`, reportData);
  }

  // Delete a report
  deleteReport(reportId: number): Observable<any> {
    return this.apiService.delete<any>(`${this.endpoint}/${reportId}`);
  }

  // Generate a report PDF based on type and data
  generateReport(reportData: any): Observable<Blob> {
    const endpoint = `${this.endpoint}/generate-report`; // Ensure your backend has this endpoint
    return this.apiService.post<Blob>(endpoint, reportData);
  }
}
