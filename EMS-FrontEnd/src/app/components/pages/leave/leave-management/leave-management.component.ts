import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../shared/services/api/api.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ApplyLeaveComponent } from '../apply-leave/apply-leave.component';
import { PageEvent } from '@angular/material/paginator';
import { API_ENDPOINTS } from '../../../../shared/constant';
import { ApprovalFlowDialogComponent } from '../../../../shared/widget/dialog/approval-flow-dialog/approval-flow-dialog.component';

@Component({
  selector: 'app-leave-management',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './leave-management.component.html',
  styleUrl: './leave-management.component.scss',
})
export class LeaveManagementComponent {
  leaveType: Array<any> = [];
  leaveReasonType: Array<any> = [];
  leaveStatusList: Array<any> = [];
  employeeLeaveFilterForm!: FormGroup;

  totalRecords = 0;
  pageSize = 5;
  currentPage: number = 1;

  displayedColumns: string[] = [
    'srno',
    'leaveType',
    'leaveDuration',
    'startDate',
    'endDate',
    'status',
  ];
  dataSource: Array<any> = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private apiService: ApiService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.prepareEmployeeLeaveFilterForm();
    this.getparams();
    console.log(this.commonService.userDetails.empNo);
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

        this.leaveStatusList = params['data'].status?.data?.types || [];
        this.leaveStatusList = this.leaveStatusList.map((item) => {
          return {
            value: item.typeValue,
            label: item.typeLabel,
          };
        });

        console.log('Leave Application Status Type--->', this.leaveStatusList);

        this.dataSource = params['data'].employeeLeaveList?.data?.leaves || [];
        this.totalRecords = params['data'].employeeLeaveList?.data?.totalRecords || 0

        console.log('Leave Application List--->', this.dataSource);
      }
    });
  }

  prepareEmployeeLeaveFilterForm() {
    this.employeeLeaveFilterForm = this.fb.group({
      leaveStatus: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  applyLeave() {
    const dialogRef = this.dialog.open(ApplyLeaveComponent, {
      width: '500px',
      // minHeight: '75vh',
      disableClose: true,
      data: {
        leaveType: this.leaveType,
        leaveReasonType: this.leaveReasonType,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'saved' || result === 'updated') {
        this.getEmployeesLeave();
      }
    });
  }

  getEmployeesLeave() {
    this.apiService
      .postApiCall(API_ENDPOINTS.SERVICE_GET_EMPLOYEE_LEAVE, {})
      .subscribe({
        next: (res: any) => {
          console.log(
            `${API_ENDPOINTS.SERVICE_SAVE_NEW_USER} Response : `,
            res
          );

          this.dataSource = res?.data?.leaves || [];
          this.totalRecords = res.data.totalRecords || 0;

          this.commonService.openSnackbar(res.message, 'success');
        },
        error: (error) => {
          this.commonService.openSnackbar(error.error.message, 'error');
        },
      });
  }

  applyFilters() {
    this.getEmployeesLeave();
  }

  clearFilters() {}

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

  openApprovalFlowDialog(leaveId: string): void {
  this.dialog.open(ApprovalFlowDialogComponent, {
    width: '500px',
    data: { leaveId }
  });
}

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getEmployeesLeave();
  }
}
