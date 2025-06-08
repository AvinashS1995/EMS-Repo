import { Component } from '@angular/core';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ApiService } from '../../../../shared/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_ENDPOINTS } from '../../../../shared/constant';
import { SharedModule } from '../../../../shared/shared.module';
import { ApprovalFlowDialogComponent } from '../../../../shared/widget/dialog/approval-flow-dialog/approval-flow-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApplyLeaveComponent } from '../apply-leave/apply-leave.component';

@Component({
  selector: 'app-leave-approval-request-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './leave-approval-request-list.component.html',
  styleUrl: './leave-approval-request-list.component.scss',
})
export class LeaveApprovalRequestListComponent {
  leaveRequests: Array<any> = [];
  EmployeeNo: any;
  RoleName: any;
  UserEmail: any;
  pendingLeaveCount: number = 0;

  leaveType: Array<any> = [];
  leaveReasonType: Array<any> = [];

  displayedColumns: string[] = [
    'srno',
    'empNo',
    'name',
    'fromDate',
    'toDate',
    'status',
  ];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private commonService: CommonService,
    private dialog: MatDialog,
     private activateRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadUserDetails();
    this.getEmployeeLeaveRequestList();
    this.getparams();
  }

  getparams() {
    this.activateRoute.data.subscribe((params) => {
      // console.log('Params Leave Management ---->', params);

      if (params['data']) {
        this.leaveType = params['data'].leaveType?.data?.types || [];
        this.leaveType = this.leaveType.map((item) => {
          return {
            value: item.typeValue,
            label: item.typeLabel,
          };
        });

        console.log('Leave Type--->', this.leaveType);

        this.leaveReasonType =
          params['data'].leaveReasonType?.data?.types || [];
        this.leaveReasonType = this.leaveReasonType.map((item) => {
          return {
            value: item.typeValue,
            label: item.typeLabel,
          };
        });

        console.log('Leave Reason Type--->', this.leaveReasonType);

      }
    });
  }

  loadUserDetails() {
    if (typeof window !== 'undefined') {
      const encryptedEmployeeNo =
        localStorage.getItem('empNo') || sessionStorage.getItem('empNo');
      const encryptedRole =
        localStorage.getItem('roleName') || sessionStorage.getItem('roleName');

      const encryptedEmail =
        localStorage.getItem('email') || sessionStorage.getItem('email');

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
      if (
        encryptedEmployeeNo &&
        encryptedRole &&
        encryptedEmail &&
        this.commonService.secretKey
      ) {
        this.EmployeeNo = this.commonService.decryptWithKey(
          encryptedEmployeeNo,
          this.commonService.secretKey
        );
        this.RoleName = this.commonService.decryptWithKey(
          encryptedRole,
          this.commonService.secretKey
        );

        this.UserEmail = this.commonService.decryptWithKey(
          encryptedEmail,
          this.commonService.secretKey
        );

        console.log(`User Name ${this.EmployeeNo}  Role Name ${this.RoleName}`);
      }
    }
  }

  getEmployeeLeaveRequestList() {
    const paylaod = {
      empNo: this.EmployeeNo ? this.EmployeeNo : '',
      role: this.RoleName ? this.RoleName : '',
    };
    console.log('SERVICE_GET_USER_ATTENDENCE paylaod', paylaod);

    this.apiService
      .postApiCall(
        API_ENDPOINTS.SERVICE_GET_EMPLOYEE_LEAVE_REQUEST_LIST,
        paylaod
      )
      .subscribe({
        next: (res: any) => {
          console.log(
            `${API_ENDPOINTS.SERVICE_GET_EMPLOYEE_LEAVE_REQUEST_LIST} Response : `,
            res
          );

          this.leaveRequests = res?.data?.leaveRequests || [];

          this.commonService.openSnackbar(res.message, 'success');
        },
        error: (error) => {
          this.commonService.openSnackbar(error.error.message, 'error');
        },
      });
  }

  openViewApproval(leave: any) {
    this.dialog.open(ApplyLeaveComponent, {
      width: '500px',
      disableClose: true,
    data: {
      mode: 'view',  
      leaveRequest: leave,
      leaveType: this.leaveType,
      leaveReasonType: this.leaveReasonType,    
    },
    }).afterClosed().subscribe((result) => {
      if (result) { 
        this.getEmployeeLeaveRequestList();
      }
  });;
  }

  getStatusIconClass(status: string): string {
    if (status?.toLowerCase().includes('approved')) {
      return 'approved-icon';
    } else if (status?.toLowerCase().includes('pending')) {
      return 'pending-icon';
    } else if (status?.toLowerCase().includes('rejected')) {
      return 'rejected-icon';
    }
    return '';
  }
}
