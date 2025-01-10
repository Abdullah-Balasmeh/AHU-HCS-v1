import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (this.isBrowser()) {
      this.handleSessionBasedRedirection();
      this.setupListeners();
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private handleSessionBasedRedirection(): void {
    const isPatient = sessionStorage.getItem('patient');
    const isUser = sessionStorage.getItem('user');
    const currentUrl = this.router.url;

    // Ensure proper redirection based on session state only if the user lands on an invalid page
    if (isPatient && currentUrl === '/home') {
      history.replaceState({ patient: true }, '', '/patient-page');
      this.router.navigate(['/patient-page'], { replaceUrl: true });
    } else if (isUser && currentUrl === '/home') {
      this.router.navigate(['/user-pages'], { replaceUrl: true });
    }
    // If no valid session exists, do not redirect from the current URL
    else if (!isPatient && !isUser && currentUrl !== '/home') {
      this.router.navigate(['/home'], { replaceUrl: true });
    }
  }

  private setupListeners(): void {
    window.addEventListener('popstate', this.handleBackNavigation.bind(this));
    window.addEventListener('beforeunload', this.persistSessionOnReload.bind(this));
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
      this.router.navigate(['/patient-page'], { replaceUrl: true });
    } else if (isUser) {
      this.router.navigate(['/user-pages'], { replaceUrl: true });
    }
  }

  private persistSessionOnReload(): void {
    const isPatient = sessionStorage.getItem('patient');
    const isUser = sessionStorage.getItem('user');
    const currentUrl = this.router.url;

    // Save the current route into sessionStorage
    if (isPatient || isUser) {
      sessionStorage.setItem('lastUrl', currentUrl);
    }
  }

  private logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}
