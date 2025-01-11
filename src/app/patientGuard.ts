import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class PatientGuard implements CanActivate {
    constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

    canActivate(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            // Retrieve patient and session token from sessionStorage
            const patient = sessionStorage.getItem('patient');
            const sessionToken = sessionStorage.getItem('sessionToken');

            if (patient && sessionToken) {
                return true; // Allow access if session is valid
            }

            // Redirect to login if session is invalid
            this.router.navigate(['/login-patient'], { replaceUrl: true });
        }
        return false;
    }
}
