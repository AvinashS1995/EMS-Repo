import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'login', loadComponent: () => import('../app/components/user/login/login.component').then((c)=> c.LoginComponent)},
    {path: 'forgot-password', loadComponent: () => import('../app/components/user/forgot-password/forgot-password.component').then((c)=> c.ForgotPasswordComponent)},
    {path: 'admin-dashboard', loadComponent: () => import('../app/components/dashboard/admin-dashboard/admin-dashboard.component').then((c)=> c.AdminDashboardComponent)},
];
