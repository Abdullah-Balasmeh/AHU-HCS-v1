import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  roles = signal<string[]>(['1','2','3','4','5','6','7']); // Reactive roles signal

  ngAfterViewInit(): void {
    // this.sharedService.roles$.subscribe({
    //   next: (roles) => {
    //     this.roles.set(Array.isArray(roles) ? roles : [roles]);
    //   },
    //   error: (err) => {
    //     console.error('Error fetching roles in NavBar:', err);
    //   },
    // });
  }
}
