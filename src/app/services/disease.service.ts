import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'; // Ensure the path is correct
import { Diseases } from '../interfaces/list.interface';

@Injectable({
  providedIn: 'root',
})
export class DiseaseService {
  private readonly endpoint = 'Disease';

  constructor(private readonly apiService: ApiService) {}

  // Get all diseases
  getAllDiseases(): Observable<any> {
    return this.apiService.get(this.endpoint);
  }

  // Get a specific disease by ID
  getDiseaseById(id: number): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${id}`);
  }

  // Add a new disease
  addDisease(disease: Diseases): Observable<any> {
    return this.apiService.post(this.endpoint, disease);
  }

  // Update an existing disease
  updateDisease(id: number, disease: Diseases): Observable<any> {
    return this.apiService.put(`${this.endpoint}/${id}`, disease);
  }

  // Delete a disease by ID
  deleteDisease(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
}
