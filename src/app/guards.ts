import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: object,
        private readonly router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (!this.isBrowser()) {
            console.log('Not in a browser environment');
            return false;
        }

        const isPatient = this.isSessionActive('patient');
        const isUser = this.isSessionActive('user');
        const currentPath = route.routeConfig?.path;

        console.log(`AuthGuard activated for ${currentPath}. Session state:`, { isPatient, isUser });

        if (this.isLoginPage(currentPath)) {
            if (isPatient) {
                console.log('Redirecting logged-in patient to patient page');
                this.router.navigate(['/patient-page'], { replaceUrl: true });
                return false;
            }
            if (isUser) {
                console.log('Redirecting logged-in user to user pages');
                this.router.navigate(['/user-pages'], { replaceUrl: true });
                return false;
            }
        }

        if (isPatient || isUser) {
            console.log('Access granted for logged-in user/patient');
            return true;
        }

        console.log('Redirecting unauthenticated user to home');
        this.router.navigate(['/home'], { replaceUrl: true });
        return false;
    }

    private isLoginPage(path: string | undefined): boolean {
        return path === 'login-user' || path === 'login-patient';
    }

    private isSessionActive(key: string): boolean {
        return this.isBrowser() && !!sessionStorage.getItem(key);
    }

    private isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }
}
