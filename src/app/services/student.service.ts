import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'; // Import your generic API service
import { Student } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly endpoint = 'student'; 

  constructor(private apiService: ApiService) {}

  // Fetch a student by ID
  getStudentById(id: string): Observable<Student> {
    return this.apiService.get<Student>(`${this.endpoint}/${id}`);
  }
}
