import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Procedures } from '../interfaces/list.interface';


@Injectable({
  providedIn: 'root',
})
export class ProcedureService {
  private readonly endpoint = 'Procedures';

  constructor(private readonly apiService: ApiService) {}

  getAllProcedures(): Observable<Procedures[]> {
    return this.apiService.get<Procedures[]>(this.endpoint);
  }

  getProcedureById(id: string): Observable<Procedures> {
    return this.apiService.get<Procedures>(`${this.endpoint}/${id}`);
  }

  addProcedure(procedure: Procedures): Observable<Procedures> {
    return this.apiService.post<Procedures>(this.endpoint, procedure);
  }

  updateProcedure(id: string, procedure: Procedures): Observable<void> {
    return this.apiService.put<void>(`${this.endpoint}/${id}`, procedure);
  }

  deleteProcedure(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}
