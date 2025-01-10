import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/main/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly router: Router
  ) {
    if (this.isBrowser()) {
      this.setupListeners();
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private setupListeners(): void {
    window.addEventListener('popstate', this.handleBackNavigation.bind(this));
    window.addEventListener('beforeunload', this.clearSessionOnClose.bind(this));
    this.initializeHistoryState();
  }

  private initializeHistoryState(): void {
    const isPatient = sessionStorage.getItem('patient');
    const isUser = sessionStorage.getItem('user');
    const currentUrl = this.router.url;

    if (isPatient && currentUrl === '/home') {
      history.replaceState({ patient: true }, '', '/patient-page');
      this.router.navigate(['/patient-page'], { replaceUrl: true });
    } else if (isUser && currentUrl === '/home') {
      history.replaceState({ user: true }, '', '/user-pages');
      this.router.navigate(['/user-pages'], { replaceUrl: true });
    } else if (isPatient && currentUrl === '/patient-page') {
      history.replaceState({ patient: true }, '', '/patient-page');
    } else if (isUser && currentUrl === '/user-pages') {
      history.replaceState({ user: true }, '', '/user-pages');
    }
  }

  private handleBackNavigation(event: PopStateEvent): void {
    const isPatient = !!sessionStorage.getItem('patient');
    const isUser = !!sessionStorage.getItem('user');
    const currentUrl = this.router.url;

    if (isPatient && currentUrl === '/patient-page') {
      this.handleLogoutConfirmation(event, '/patient-page');
    } else if (isUser && currentUrl === '/user-pages') {
      this.handleLogoutConfirmation(event, '/user-pages');
    } else if (currentUrl === '/home' && (isPatient || isUser)) {
      this.redirectToCorrectPage(isPatient, isUser);
    }
  }

  private handleLogoutConfirmation(event: PopStateEvent, currentPath: string): void {
    event.preventDefault();

    const confirmLogout = confirm(
      'Are you sure you want to go back to the login page? This will log you out.'
    );

    if (confirmLogout) {
      this.logout();
    } else {
      history.pushState(null, '', currentPath); // Restore the current page state
    }
  }

  private redirectToCorrectPage(isPatient: boolean, isUser: boolean): void {
    if (isPatient) {
      history.replaceState({ patient: true }, '', '/patient-page');
      this.router.navigate(['/patient-page'], { replaceUrl: true });
    } else if (isUser) {
      history.replaceState({ user: true }, '', '/user-pages');
      this.router.navigate(['/user-pages'], { replaceUrl: true });
    }
  }

  private clearSessionOnClose(): void {
    sessionStorage.clear();
    localStorage.clear();
  }

  private logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}
