import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private isLoggingSubject = new BehaviorSubject<boolean>(
    !!sessionStorage.getItem('userID')
  );
  private rolesSubject = new BehaviorSubject<string[] | string>(
    this.loadRolesFromSession() || []
  );
  private currentUserID: string | null = sessionStorage.getItem('userID');

  isLogging$ = this.isLoggingSubject.asObservable();
  roles$ = this.rolesSubject.asObservable();

  private roleFetchSubscription: Subscription | null = null;

  constructor(private readonly apiService: ApiService) {
    if (this.currentUserID) {
      this.fetchRolesForUser(this.currentUserID);
    }
  }

  updateIsLogging(value: boolean): void {
    if (value !== this.isLoggingSubject.getValue()) {
      this.isLoggingSubject.next(value);
    }
  }

  setRolesData(data: string[] | string): void {
    if (data) {
      this.rolesSubject.next(data);
      this.saveRolesToSession(data);
    } else {
      console.warn('Invalid roles data provided');
    }
  }

  getRolesData(): string[] | string {
    return this.rolesSubject.getValue();
  }

  clearRolesData(): void {
    this.rolesSubject.next([]);
    this.currentUserID = null;
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('roles'); 
  }

  setCurrentUserID(userID: string): void {
    if (userID !== this.currentUserID) {
      this.currentUserID = userID;
      sessionStorage.setItem('userID', userID);
      this.fetchRolesForUser(userID);
    }
  }

  getCurrentUserID(): string | null {
    return this.currentUserID;
  }

  private fetchRolesForUser(userID: string): void {
    if (this.roleFetchSubscription) {
      this.roleFetchSubscription.unsubscribe();
    }

    this.rolesSubject.next([]); // Reset roles while loading

    // this.roleFetchSubscription = this.apiService.getUserById(userID).subscribe({
    //   next: (user) => {
    //     if (user) {
    //       const roleIDs = Array.isArray(user.roleID) ? user.roleID : [user.roleID];
    //       this.setRolesData(roleIDs);
    //     } else {
    //       console.warn(`No user found with ID: ${userID}`);
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error fetching roles for user:', err);
    //     this.rolesSubject.next([]); // Reset roles on error
    //   },
    // });
  }

  private loadRolesFromSession(): string[] | string | null {
    const roles = sessionStorage.getItem('roles');
    return roles ? JSON.parse(roles) : null;
  }

  private saveRolesToSession(roles: string[] | string): void {
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }
  logout(): void {
    this.clearRolesData();
    this.updateIsLogging(false);
  }
  
}
