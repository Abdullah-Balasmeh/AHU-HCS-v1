import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private _isEditing = new BehaviorSubject<boolean>(false);
  isEditing$ = this._isEditing.asObservable();

  get isEditing(): boolean {
    return this._isEditing.getValue();
  }

  set isEditing(value: boolean) {
    this._isEditing.next(value);
  }
}
