import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { EmergencyOrder, Item } from '../interfaces/emergency-order.interface';

@Injectable({
  providedIn: 'root',
})
export class EmergencyOrderService {
  private readonly endpoint = 'EmergencyOrder';

  constructor(private readonly apiService: ApiService) {}

  // Get all emergency orders
  getAllOrders(): Observable<EmergencyOrder[]> {
    return this.apiService.get<EmergencyOrder[]>(this.endpoint);
  }

  // Get an order by ID
  getOrderById(id: number): Observable<EmergencyOrder> {
    return this.apiService.get<EmergencyOrder>(`${this.endpoint}/${id}`);
  }

  // Get approved orders
  getApprovedOrders(): Observable<EmergencyOrder[]> {
    return this.apiService.get<EmergencyOrder[]>(`${this.endpoint}/approved`);
  }

  // Get unapproved orders
  getUnapprovedOrders(orderType: string): Observable<EmergencyOrder[]> {
    return this.apiService.get<EmergencyOrder[]>(`${this.endpoint}/unapproved/type/${orderType}`);
  }

  // Get orders by type
  getOrdersByType(orderType: string): Observable<EmergencyOrder[]> {
    return this.apiService.get<EmergencyOrder[]>(`${this.endpoint}/type/${orderType}`);
  }

  // Add a new emergency order
  addOrder(order: EmergencyOrder): Observable<EmergencyOrder> {
    return this.apiService.post<EmergencyOrder>(this.endpoint, order);
  }

  // Update an emergency order
  updateOrder(id: number, order: EmergencyOrder): Observable<EmergencyOrder> {
    return this.apiService.put<EmergencyOrder>(`${this.endpoint}/${id}`, order);
  }

  // Delete an emergency order
  deleteOrder(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }

  // Add a new item
  addItem(item: Item): Observable<Item> {
    return this.apiService.post<Item>(`${this.endpoint}/item`, item);
  }

  // Get an item by ID
  getItemById(id: number): Observable<Item> {
    return this.apiService.get<Item>(`${this.endpoint}/item/${id}`);
  }

  // Update an item
  updateItem(id: number, item: Item): Observable<Item> {
    return this.apiService.put<Item>(`${this.endpoint}/item/${id}`, item);
  }

  // Delete an item
  deleteItem(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/item/${id}`);
  }
}
