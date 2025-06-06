import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { Sidenav } from '../../../shared/interfaces/sidenav';
import { SharedModule } from '../../../shared/shared.module';
import { CommonService } from '../../../shared/services/common/common.service';
import { NgClass } from '@angular/common';
import { ApiService } from '../../../shared/services/api/api.service';
import { API_ENDPOINTS } from '../../../shared/constant';
import { AuthService } from '../../../shared/services/api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [SharedModule, NgClass],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  @Output() navigateEvent = new EventEmitter<string>();

  menuItems = signal<Sidenav[]>([]);

  UserName: string = '';
  RoleName: string = '';
  UserEmail: string = '';

  token: string | null = null;

  constructor(
    private apiService: ApiService,
    public commonService: CommonService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.token = this.commonService.getToken();
      // console.log(token);
    }

    if (this.token) {
      this.loadRoleBasedMenus();
    }

    this.loadUserDetails();
  }

  loadRoleBasedMenus() {
    const payload = {
      role: 'Admin',
    };
    this.apiService
      .menuApiCall(API_ENDPOINTS.SERVICE_ROLEWISEMENUS, payload)
      .subscribe((res: any) => {
        if (res?.status === 'success') {
          const menus = res.roleMenus.menus
            .filter((item: any) => item.access === 'fullAccess')
            .map((item: any) => ({
              title: item.menuId.title,
              icon: item.menuId.icon,
              route: item.menuId.path,
              sequence: item.menuId.sequence,
              role: res.roleMenus.role.toLowerCase(),
            }));

          // Sort by sequence
          this.menuItems.set(
            menus.sort((a: Sidenav, b: Sidenav) => a.sequence - b.sequence)
          );
        }
      });
  }

  navigateTO(url: string) {
    // debugger
    this.navigateEvent.emit(url);
  }

  loadUserDetails() {
    if (typeof window !== 'undefined') {
      const encryptedName =
        localStorage.getItem('userName') || sessionStorage.getItem('userName');
      const encryptedRole =
        localStorage.getItem('roleName') || sessionStorage.getItem('roleName');

      const encryptedEmail = localStorage.getItem('email') || sessionStorage.getItem('email');


      const encryptedSecretKey =
        localStorage.getItem('key') || sessionStorage.getItem('key');

      if (encryptedSecretKey) {
        // First decrypt the encrypted secretKey
        const decryptedMainKey =
          this.commonService.decryptSecretKey(encryptedSecretKey);
        this.commonService.secretKey = decryptedMainKey; // Set it again after refresh
        console.log(
          'this.commonService.secretKey---->',
          this.commonService.secretKey
        );
      }
      if (encryptedName && encryptedRole &&  encryptedEmail && this.commonService.secretKey) {
        this.UserName = this.commonService.decryptWithKey(
          encryptedName,
          this.commonService.secretKey
        );
        this.RoleName = this.commonService.decryptWithKey(
          encryptedRole,
          this.commonService.secretKey
        );

        this.UserEmail = this.commonService.decryptWithKey(encryptedEmail, this.commonService.secretKey);


        console.log(`User Name ${this.UserName}  Role Name ${this.RoleName}`);
      }
    }
  }

  confirmLogout() {
    this.commonService
      .showConfirmationDialog({
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        confirmText: 'Yes',
        cancelText: 'No',
      })
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.logout();
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  logout() {
    this.authService.authApiCall(API_ENDPOINTS.SERVICE_LOG_OUT, {}).subscribe({
      next: (res: any) => {
        this.checkOutEmployeeAttendence();
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
        localStorage.clear();
        this.commonService.openSnackbar(res.message, 'success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.commonService.openSnackbar(error.error.message, 'error');
      },
    });
  }

  checkOutEmployeeAttendence() {
    const paylaod = {
      email: this.UserEmail ? this.UserEmail : '',
    }

    this.apiService.postApiCall(API_ENDPOINTS.SERVICE_CHECK_OUT_ATTENDENCE, paylaod).subscribe({
      next: (res: any) => {
        console.log(`${API_ENDPOINTS.SERVICE_SAVE_NEW_USER} Response : `, res);
        
        this.commonService.openSnackbar(res.message, 'success');
        // setTimeout(() => {
        //   this.logout();
        // }, 3000);
      },
      error: (error) => {
        this.commonService.openSnackbar(error.error.message, 'error');
      },
    });
  }
}
