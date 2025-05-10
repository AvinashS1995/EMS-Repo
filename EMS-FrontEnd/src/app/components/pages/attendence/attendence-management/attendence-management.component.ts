import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { SharedModule } from '../../../../shared/shared.module';
import { API_ENDPOINTS } from '../../../../shared/constant';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ApiService } from '../../../../shared/services/api/api.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


export interface AttendanceRecord {
  date: string;
  name: string;
  role: string;
  employmentType: string;
  status: string;
  checkIn: string;
  checkOut: string;
  photo: string;
}

@Component({
  selector: 'app-attendence-management',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './attendence-management.component.html',
  styleUrl: './attendence-management.component.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class AttendenceManagementComponent {


  displayedColumns: string[] = ['date', 'employee', 'role', 'employmentType', 'status', 'checkIn', 'checkOut'];
  dataSource:Array<any> = []

  UserEmail: string = '';

  constructor(private commonService: CommonService, private apiService: ApiService) {}

  ngOnInit() {
    this.loadUserEmail();
    this.getEmployeeAttendence();
    
  }

  getEmployeeAttendence() {


    const paylaod = {
      email: this.UserEmail ? this.UserEmail : '',
    }

    this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GET_USER_ATTENDENCE, paylaod).subscribe({
      next: (res: any) => {
        console.log(`${API_ENDPOINTS.SERVICE_SAVE_NEW_USER} Response : `, res);

        this.dataSource = res?.data?.employeeAttendenceList || [];
        // this.totalRecords = res.data.totalRecords || 0;
        
        this.commonService.openSnackbar(res.message, 'success');
      },
      error: (error) => {
        this.commonService.openSnackbar(error.error.message, 'error');
      },
    });
  }

  loadUserEmail() {
    if (typeof window !== 'undefined') {
      const encryptedEmail = localStorage.getItem('email') || sessionStorage.getItem('email');
  
      const encryptedSecretKey = localStorage.getItem('key') || sessionStorage.getItem('key');

      if (encryptedSecretKey) {
        // First decrypt the encrypted secretKey
        const decryptedMainKey = this.commonService.decryptSecretKey(encryptedSecretKey);
        this.commonService.secretKey = decryptedMainKey; // Set it again after refresh
        console.log("this.commonService.secretKey---->",this.commonService.secretKey );

      }
      if (encryptedEmail && this.commonService.secretKey) {
        this.UserEmail = this.commonService.decryptWithKey(encryptedEmail, this.commonService.secretKey);

        console.log(`User Email ${this.UserEmail}`);
        
      }
      
    }
  }
}
