import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './components/main/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private readonly sessionKey = 'activeUserSession';
  private readonly timestampKey = 'lastSessionTimestamp';

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cleanupStaleSession();
      this.updateSessionTimestamp();
    }
  }

  private cleanupStaleSession(): void {
    const lastTimestamp = localStorage.getItem(this.timestampKey);
    if (lastTimestamp && Date.now() - parseInt(lastTimestamp, 10) > 5 * 60 * 1000) {
      // Assume 5 minutes of inactivity marks a stale session.
      localStorage.removeItem(this.sessionKey);
      localStorage.removeItem(this.timestampKey);
    }
  }

  private updateSessionTimestamp(): void {
    localStorage.setItem(this.timestampKey, Date.now().toString());
  }
}
