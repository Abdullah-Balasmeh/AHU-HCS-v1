import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Medicine } from '../interfaces/list.interface';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private readonly endpoint = 'Medicine';

  constructor(private apiService: ApiService) {}

  getAllMedicines(): Observable<Medicine[]> {
    return this.apiService.get<Medicine[]>(this.endpoint);
  }

  getMedicineById(id: string): Observable<Medicine> {
    return this.apiService.get<Medicine>(`${this.endpoint}/${id}`);
  }

  addMedicine(medicine: Medicine): Observable<Medicine> {
    return this.apiService.post<Medicine>(this.endpoint, medicine);
  }

  updateMedicine(id: string, medicine: Medicine): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}/${id}`, medicine);
  }

  deleteMedicine(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}
