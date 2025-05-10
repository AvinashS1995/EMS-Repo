import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { EmployeeManagementResolverService } from './components/pages/employee/employee-management/employee-management-resolver.service';
import { ConfigurationResolverService } from './components/pages/configuration/configuration/configuration-resolver.service';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/components/user/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import(
        '../app/components/user/forgot-password/forgot-password.component'
      ).then((c) => c.ForgotPasswordComponent),
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../app/components/pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'employee-management',
        loadComponent: () =>
          import(
            '../app/components/pages/employee/employee-management/employee-management.component'
          ).then((c) => c.EmployeeManagementComponent),
          data: {
            title: "Employee Management"
          },
          resolve: { data: EmployeeManagementResolverService }
      },
      {
        path: 'add-employee',
        loadComponent: () =>
          import(
            '../app/components/pages/employee/add-employee/add-employee.component'
          ).then((c) => c.AddEmployeeComponent),
      },
      {
        path: 'attendence-management',
        loadComponent: () =>
          import(
            '../app/components/pages/attendence/attendence-management/attendence-management.component'
          ).then((c) => c.AttendenceManagementComponent),
      },
      {
        path: 'leave-management',
        loadComponent: () =>
          import(
            '../app/components/pages/leave-management/leave-management.component'
          ).then((c) => c.LeaveManagementComponent),
      },
      {
        path: 'sales-management',
        loadComponent: () =>
          import(
            '../app/components/pages/sales-management/sales-management.component'
          ).then((c) => c.SalesManagementComponent),
      },
      {
        path: 'payroll-management',
        loadComponent: () =>
          import(
            '../app/components/pages/payroll-management/payroll-management.component'
          ).then((c) => c.PayrollManagementComponent),
      },
      {
        path: 'configuration',
        loadComponent: () =>
          import('./components/pages/configuration/configuration/configuration.component').then(
            (c) => c.ConfigurationComponent
          ),
          data: {
            title: "Configuration"
          },
          resolve: { data: ConfigurationResolverService }
      },
      {
        path: 'add-new-role-type',
        loadComponent: () =>
          import('./components/pages/configuration/add-new-role-type/add-new-role-type.component').then(
            (c) => c.AddNewRoleTypeComponent
          ),
      },
    ],
  },
];
