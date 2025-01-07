import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private readonly router: Router) { }

    canActivate(): boolean {
        if (this.isBrowser() && sessionStorage.getItem('patient')) {
            return true; // Allow navigation if the patient is logged in
        }

        this.router.navigate(['/login-patient']); // Redirect to login if not authenticated
        return false;
    }

    // Utility method to check if the code is running in the browser
    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
    }
}
