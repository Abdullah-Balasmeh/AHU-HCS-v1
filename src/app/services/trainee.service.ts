import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'; 
import { Trainee } from '../interfaces/trainee.interface';

@Injectable({
  providedIn: 'root',
})
export class TraineeService {
  private readonly endpoint = 'trainee'; // Base endpoint for trainees

  constructor(private readonly apiService: ApiService) {}

  // Get all trainees
  getAllTrainees(): Observable<Trainee[]> {
    return this.apiService.get<Trainee[]>(this.endpoint);
  }

  // Get trainee by ID
  getTraineeById(id: string): Observable<Trainee> {
    return this.apiService.get<Trainee>(`${this.endpoint}/${id}`);
  }

  // Add a new trainee
  addTrainee(trainee: Trainee): Observable<Trainee> {
    return this.apiService.post<Trainee>(this.endpoint, trainee);
  }

  // Update a trainee
  updateTrainee(id: string, trainee: Trainee): Observable<Trainee> {
    return this.apiService.put<Trainee>(`${this.endpoint}/${id}`, trainee);
  }

  // Delete a trainee
  deleteTrainee(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}
