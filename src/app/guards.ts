import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private readonly router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (this.isBrowser()) {
            const isPatient = this.getSessionItem('patient');
            const isUser = this.getSessionItem('user');

            const isLoginPage =
                route.routeConfig?.path === 'login-user' || route.routeConfig?.path === 'login-patient';

            if (isLoginPage) {
                if (isPatient || isUser) {
                    this.redirectAuthenticatedUser();
                    return false;
                }
                return true;
            }

            if (isPatient || isUser) {
                return true;
            }
        }

        this.router.navigate(['/home']);
        return false;
    }

    private redirectAuthenticatedUser(): void {
        const isPatient = this.getSessionItem('patient');
        const isUser = this.getSessionItem('user');

        if (isPatient) {
            this.router.navigate(['/patient-page']);
        } else if (isUser) {
            this.router.navigate(['/user-pages']);
        }
    }

    private isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    private getSessionItem(key: string): string | null {
        return this.isBrowser() ? sessionStorage.getItem(key) : null;
    }
}
