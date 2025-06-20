import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { EmployeeManagementResolverService } from './components/pages/employee/employee-management/employee-management-resolver.service';
import { ConfigurationResolverService } from './components/pages/configuration/configuration/configuration-resolver.service';
import { AttendenceManagementResolverService } from './components/pages/attendence/attendence-management/attendence-management-resolver.service';
import { LeaveManagementResolverService } from './components/pages/leave/leave-management/leave-management-resolver.service';
import { DashboardResolverService } from './components/pages/dashboard/dashboard-resolver.service';
import { LeaveApprovalRequestListResolverService } from './components/pages/leave/leave-approval-request-list/leave-approval-request-list-resolver.service';
import { CreateMenuConfigurationResolverService } from './components/pages/configuration/menu/create-menu-configuration/create-menu-configuration-resolver.service';
import { RoleWiseMenuConfigurationResolverService } from './components/pages/configuration/menu/role-wise-menu-configuration/role-wise-menu-configuration-resolver.service';
import { EmployeeProfileResolverService } from './components/pages/employee-profile/employee-profile-resolver.service';

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
            (c) => c.DashboardComponent),
            data: {
              title: "Dashboard"
            },
            resolve: { data: DashboardResolverService }
      },
      {
        path: 'employee-profile',
        loadComponent: () =>
          import('../app/components/pages/employee-profile/employee-profile.component').then(
            (c) => c.EmployeeProfileComponent),
            data: {
              title: "Employee Profile"
            },
            resolve: { data: EmployeeProfileResolverService }
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
          data: {
            title: "Attendence Management"
          },
          resolve: { data: AttendenceManagementResolverService }
      },
      {
        path: 'leave-management',
        loadComponent: () =>
          import(
            './components/pages/leave/leave-management/leave-management.component'
          ).then((c) => c.LeaveManagementComponent),
          data: {
            title: "Leave Management"
          },
          resolve: { data: LeaveManagementResolverService }
      },
      {
        path: 'employee-leave-approval-request-list',
        loadComponent: () =>
          import(
            './components/pages/leave/leave-approval-request-list/leave-approval-request-list.component'
          ).then((c) => c.LeaveApprovalRequestListComponent),
          data: {
            title: "Employee Leave Approval Request List"
          },
          resolve: { data: LeaveApprovalRequestListResolverService }
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
        path: 'option-type-configuration',
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
      {
        path: 'menu-configuration',
        loadComponent: () =>
          import('./components/pages/configuration/menu/menu-configuration/menu-configuration.component').then(
            (c) => c.MenuConfigurationComponent
          ),
          data: {
            title: "Menu Configuration List",
          },
          resolve: { data: CreateMenuConfigurationResolverService }
      },
      {
        path: 'create-menu',
        loadComponent: () =>
          import('./components/pages/configuration/menu/create-menu-configuration/create-menu-configuration.component').then(
            (c) => c.CreateMenuConfigurationComponent
          ),
          data: {
            title: "Create Menu Configuration",
          },
          resolve: { data: CreateMenuConfigurationResolverService }
      },
      {
        path: 'role-wise-menu-configuration',
        loadComponent: () =>
          import('./components/pages/configuration/menu/role-wise-menu-configuration/role-wise-menu-configuration.component').then(
            (c) => c.RoleWiseMenuConfigurationComponent
          ),
          data: {
            title: "Role Wise Menu Configuration",
          },
          resolve: { data: RoleWiseMenuConfigurationResolverService }
      },
    ],
  },
];
