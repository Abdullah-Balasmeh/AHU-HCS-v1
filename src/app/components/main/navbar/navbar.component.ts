import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  roles = signal<string[]>([]);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const userRoles = parsedUser.roles || [];
      this.roles.set(userRoles);

      const currentUrl = this.router.url;
      if (userRoles.length > 0 && !this.isRolePage(currentUrl)) {
        this.router.navigate([`/user-pages/${this.getRouteByRole(userRoles[0])}`]);
      }
    }
  }

  private getRouteByRole(role: string): string {
    switch (role) {
      case 'Admin':
        return 'admin-page';
      case 'Manager':
        return 'manager-page';
      case 'Receptionist':
        return 'reception-page';
      case 'Doctor':
        return 'clinic-page';
      case 'NurseM':
        return 'emergency-male-page';
      case 'NurseF':
        return 'emergency-female-page';
      case 'Pharmacist':
        return 'pharmacy-page';
      default:
        return '';
    }
  }

  private isRolePage(url: string): boolean {
    return this.roles().some((role) =>
      url.includes(this.getRouteByRole(role))
    );
  }
}
