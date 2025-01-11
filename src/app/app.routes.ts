import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PatientGuard } from './patientGuard';
import { UserGuard } from './userGuards';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
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
        canActivate: [PatientGuard], // Ensure valid patient session
    },
    {
        path: 'user-pages',
        loadComponent: () =>
            import('./pages/user-page/user-page.component').then(
                (c) => c.UserPageComponent
            ),
        canActivate: [UserGuard], // Ensure valid user session
        children: [
            {
                path: 'admin-page',
                loadComponent: () =>
                    import('./pages/admin-page/admin-page.component').then(
                        (c) => c.AdminPageComponent
                    ),
                canActivate: [UserGuard],
            },
            {
                path: 'manager-page',
                loadComponent: () =>
                    import('./pages/manager-page/manager-page.component').then(
                        (c) => c.ManagerPageComponent
                    ),
                canActivate: [UserGuard],
            },
            {
                path: 'reception-page',
                loadComponent: () =>
                    import('./pages/reception-page/reception-page.component').then(
                        (c) => c.ReceptionPageComponent
                    ),
                canActivate: [UserGuard],
            },
            {
                path: 'clinic-page',
                loadComponent: () =>
                    import('./pages/clinic-page/clinic-page.component').then(
                        (c) => c.ClinicPageComponent
                    ),
                canActivate: [UserGuard],
            },
            {
                path: 'emergency-male-page',
                loadComponent: () =>
                    import('./pages/emergency-male-page/emergency-male-page.component').then(
                        (c) => c.EmergencyMalePageComponent
                    ),
                canActivate: [UserGuard],
            },
            {
                path: 'emergency-female-page',
                loadComponent: () =>
                    import('./pages/emergency-female-page/emergency-female-page.component').then(
                        (c) => c.EmergencyFemalePageComponent
                    ),
                canActivate: [UserGuard],
            },
            {
                path: 'pharmacy-page',
                loadComponent: () =>
                    import('./pages/pharmacy-page/pharmacy-page.component').then(
                        (c) => c.PharmacyPageComponent
                    ),
                canActivate: [UserGuard],
            },
        ],
    },
    { path: '**', redirectTo: 'home' }, // Wildcard route for undefined paths
];
