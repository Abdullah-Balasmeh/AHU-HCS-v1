import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './guards';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomePageComponent,
    },
    {
        path: 'login-user',
        loadComponent: () =>
            import('./pages/login-user-page/login-user-page.component').then(
                (c) => c.LoginUserPageComponent
            ),
    },
    {
        path: 'login-patient',
        loadComponent: () =>
            import('./pages/login-patient-page/login-patient-page.component').then(
                (c) => c.LoginPatientPageComponent
            ),
    },
    {
        path: 'patient-page',
        loadComponent: () =>
            import('./pages/patient-page/patient-page.component').then(
                (c) => c.PatientPageComponent
            ),
        canActivate: [AuthGuard], // Guarded route
    },
    {
        path: 'logout',
        loadComponent: () =>
            import('./pages/login-patient-page/login-patient-page.component').then(
                (c) => c.LoginPatientPageComponent
            ),
    },
    {
        path: '**',
        redirectTo: 'home', // Redirect any unknown paths to the home page
    },
];
