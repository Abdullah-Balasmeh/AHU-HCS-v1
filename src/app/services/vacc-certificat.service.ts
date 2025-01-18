import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { VaccCertificat, VaccDipen } from '../interfaces/VaccCertificat.inertface';

@Injectable({
  providedIn: 'root',
})
export class VaccCertificatService {
  private readonly endpoint = 'VaccCertificat';
  private readonly endpointDipen = 'VaccDipen';

  constructor(private readonly apiService: ApiService) {}

  // Get all VaccCertificats
  getAllVaccCertificats(): Observable<VaccCertificat[]> {
    return this.apiService.get<VaccCertificat[]>(this.endpoint);
  }

  // Get VaccCertificat by StudentId
  getVaccCertificatByStudentId(studentId: string): Observable<VaccCertificat[]> {
    return this.apiService.get<VaccCertificat[]>(`${this.endpoint}/${studentId}`);
  }

  // Add new VaccCertificat
  addVaccCertificat(vaccCertificat: VaccCertificat): Observable<VaccCertificat> {
    return this.apiService.post<VaccCertificat>(this.endpoint, vaccCertificat);
  }

  // Update existing VaccCertificat
  updateVaccCertificat(vaccCertificat: VaccCertificat): Observable<VaccCertificat> {
    return this.apiService.put<VaccCertificat>(this.endpoint, vaccCertificat);
  }


  getAllVaccDipens(): Observable<VaccDipen[]> {
    return this.apiService.get<VaccDipen[]>(this.endpointDipen);
  }

  getVaccDipenByStudentId(studentId: string): Observable<VaccDipen[]> {
    return this.apiService.get<VaccDipen[]>(`${this.endpointDipen}/${studentId}`);
  }

  addVaccDipen(vaccDipen: VaccDipen): Observable<VaccDipen> {
    return this.apiService.post<VaccDipen>(this.endpointDipen, vaccDipen);
  }
}
