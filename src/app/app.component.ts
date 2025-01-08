import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/main/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private currentUrl: string = '/';
  private previousUrl: string = '/';
  private allowNavigation = true; // Flag to control navigation

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private readonly router: Router
  ) {
    if (this.isBrowser()) {
      this.setupNavigationTracking();
      this.setupBackNavigationHandler();
      this.setupTabCloseHandler();
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private setupNavigationTracking(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  private setupBackNavigationHandler(): void {
    window.addEventListener('popstate', (event) => {
      if (!this.allowNavigation) {
        // Prevent navigation if "Cancel" was clicked
        this.allowNavigation = true;
        history.pushState(null, '', this.currentUrl);
        return;
      }

      if (
        (this.currentUrl === '/patient-page' || this.currentUrl === '/user-pages') &&
        (this.previousUrl === '/login-user' || this.previousUrl === '/login-patient')
      ) {
        const confirmLogout = window.confirm(
          'Are you sure you want to go back? This will log you out.'
        );

        if (confirmLogout) {
          this.logoutAndRedirect();
        } else {
          this.allowNavigation = false; // Prevent navigation
          history.pushState(null, '', this.currentUrl); // Restore current page
        }
      }
    });
  }

  private setupTabCloseHandler(): void {
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('activeUserSession');
      localStorage.removeItem('activePatientSession');
    });
  }

  private logoutAndRedirect(): void {
    sessionStorage.clear();
    localStorage.removeItem('activeUserSession');
    localStorage.removeItem('activePatientSession');
    this.router.navigate(['/home']);
  }
}
