import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'login', loadComponent: () => import('../app/components/user/login/login.component').then((c)=> c.LoginComponent)}
];
