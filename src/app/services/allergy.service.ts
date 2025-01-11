import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Allergy } from '../interfaces/list.interface';


@Injectable({
  providedIn: 'root',
})
export class AllergyService {
  private readonly endpoint = 'Allergy';

  constructor(private readonly apiService: ApiService) {}

  getAllAllergies(): Observable<Allergy[]> {
    return this.apiService.get<Allergy[]>(this.endpoint);
  }

  getAllergyById(id: string): Observable<Allergy> {
    return this.apiService.get<Allergy>(`${this.endpoint}/${id}`);
  }

  addAllergy(allergy: Allergy): Observable<Allergy> {
    return this.apiService.post<Allergy>(this.endpoint, allergy);
  }

  updateAllergy(id: string, allergy: Allergy): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}/${id}`, allergy);
  }

  deleteAllergy(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}
