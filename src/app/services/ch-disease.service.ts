import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChDisease } from '../interfaces/list.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChDiseaseService {
  private readonly endpoint = 'ChDisease';

  constructor(private readonly apiService: ApiService) {}


  getAllChDisease(): Observable<any> {
    return this.apiService.get(this.endpoint);
  }


  getChDiseaseById(id: number): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${id}`);
  }


  addChDisease(chDisease: ChDisease): Observable<any> {
    return this.apiService.post(this.endpoint, chDisease);
  }


  updateChDisease(id: number, chDisease: ChDisease): Observable<any> {
    return this.apiService.put(`${this.endpoint}/${id}`, chDisease);
  }


  deleteChDisease(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
}
