import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from "../../components/main/navbar/navbar.component";
import { Router, RouterOutlet } from '@angular/router';
import { LogoutBtnComponent } from "../../components/main/logout-btn/logout-btn.component";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, LogoutBtnComponent],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {
  roles = signal<string[]>([]);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.roles.set(parsedUser.roles || []);
    } else {
      this.router.navigate(['/login-user']); // Redirect to login if session is missing
    }
  }

  onLogout(): void {
    const confirmLogout = confirm(
      'هل أنت متأكد من الخروج؟'
    );
    if(confirmLogout){
      localStorage.removeItem('activeUserSession');
      sessionStorage.removeItem('sessionToken');
      sessionStorage.removeItem('user');
      this.router.navigate(['/login-user']);
    }
  }
  
}
