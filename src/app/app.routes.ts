import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './guards';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    {
        path: 'login-user',
        loadComponent: () =>
            import('./pages/login-user-page/login-user-page.component').then((c) => c.LoginUserPageComponent),
    },
    {
        path: 'login-patient',
        loadComponent: () =>
            import('./pages/login-patient-page/login-patient-page.component').then((c) => c.LoginPatientPageComponent),
    },
    {
        path: 'patient-page',
        loadComponent: () =>
            import('./pages/patient-page/patient-page.component').then((c) => c.PatientPageComponent),
        canActivate: [AuthGuard],
    },
    {
        path: 'user-pages',
        loadComponent: () =>
            import('./pages/user-page/user-page.component').then((c) => c.UserPageComponent),
        canActivate: [AuthGuard],
        children: [
            {
                path: 'admin-page',
                loadComponent: () =>
                    import('./pages/admin-page/admin-page.component').then((c) => c.AdminPageComponent),
            },
            {
                path: 'manager-page',
                loadComponent: () =>
                    import('./pages/manager-page/manager-page.component').then((c) => c.ManagerPageComponent),
            },
            {
                path: 'reception-page',
                loadComponent: () =>
                    import('./pages/reception-page/reception-page.component').then((c) => c.ReceptionPageComponent),
            },
            {
                path: 'clinic-page',
                loadComponent: () =>
                    import('./pages/clinic-page/clinic-page.component').then((c) => c.ClinicPageComponent),
            },
            {
                path: 'emergency-male-page',
                loadComponent: () =>
                    import('./pages/emergency-male-page/emergency-male-page.component').then(
                        (c) => c.EmergencyMalePageComponent
                    ),
            },
            {
                path: 'emergency-female-page',
                loadComponent: () =>
                    import('./pages/emergency-female-page/emergency-female-page.component').then(
                        (c) => c.EmergencyFemalePageComponent
                    ),
            },
            {
                path: 'pharmacy-page',
                loadComponent: () =>
                    import('./pages/pharmacy-page/pharmacy-page.component').then((c) => c.PharmacyPageComponent),
            },
        ],
    },
    { path: '**', redirectTo: 'home' },
];
