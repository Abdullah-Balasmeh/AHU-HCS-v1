import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";
import { Report } from "../interfaces/report.interface";

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private readonly endpoint = 'Reports';

  constructor(private readonly apiService: ApiService) {}

  // Get all reports
  getAllReports(): Observable<Report[]> {
    return this.apiService.get<[]>(this.endpoint);
  }

  // Get reports by patient ID
  getReportsByPatientId(patientId: string): Observable<Report[]> {
    return this.apiService.get<Report[]>(`${this.endpoint}/patient/${patientId}`);
  }

  // Get reports by date
  getReportsByDate(date: string): Observable<Report[]> {
    return this.apiService.get<Report[]>(`${this.endpoint}/date/${date}`);
  }

  // Add a new report
  addReport(report: Report): Observable<Report> {
    return this.apiService.post<Report>(this.endpoint, report);
  }
}