import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ApiService } from '../../../../shared/services/api/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API_ENDPOINTS } from '../../../../shared/constant';
import { RejectCommentDialogComponent } from '../../../../shared/widget/dialog/reject-comment-dialog/reject-comment-dialog.component';

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

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class ApplyLeaveComponent {
  selectedDate: Date | null = null;

  leaveForm!: FormGroup;

  leaveTypeList: Array<any> = [];
  leaveReasonTypeList: Array<any> = [];

  dialogTitle = 'Apply Leave';
  isViewMode = false;
  EmployeeName: any;
  RoleName: any;
  EmployeeNo: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private commonService: CommonService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.loadUserDetails();
    this.prepareCreateLeaveForm();
    this.leaveTypeList = this.data.leaveType || [];

    // console.log(this.leaveTypeList);

    this.leaveReasonTypeList = this.data.leaveReasonType || [];

    // console.log(this.leaveReasonTypeList);
  }

  prepareCreateLeaveForm() {
    this.leaveForm = this.fb.group({
      employeeNoWithName: [' ', Validators.required],
      leaveType: [' ', Validators.required],
      leaveDuration: [' ', Validators.required],
      startDate: [' ', Validators.required],
      endDate: [' ', Validators.required],
      leaveReasonType: [' ', Validators.required],
      leaveReasonComment: [' ', Validators.required],
    });

    if (this.data?.mode === 'view' && this.data?.leaveRequest) {
      this.isViewMode = true;
      this.dialogTitle = 'View Leave Details';

      // Patch incoming data
      const {
        empNo,
        name,
        leaveType,
        leaveDuration,
        fromDate,
        toDate,
        reasonType,
        reasonComment,
      } = this.data.leaveRequest;

      this.leaveForm.patchValue({
        employeeNoWithName: `${name} [${empNo}]`,
        leaveType: leaveType,
        leaveDuration: leaveDuration,
        startDate: fromDate,
        endDate: toDate,
        leaveReasonType: reasonType,
        leaveReasonComment: reasonComment,
      });

      // Disable all fields – we are just viewing
      this.leaveForm.disable();
    }

    if (!this.data?.mode) {
      const EmployeeNoWithName = `${this.commonService.userDetails.name} [${this.commonService.userDetails.empNo}]`;

      this.leaveForm.patchValue({
        employeeNoWithName: EmployeeNoWithName || '',
      });

      this.leaveForm.controls['employeeNoWithName'].disable();
    }
  }

  ApplyLeave() {
    console.log(this.leaveForm.getRawValue());

    const {
      employeeNoWithName,
      leaveType,
      leaveDuration,
      startDate,
      endDate,
      leaveReasonType,
      leaveReasonComment,
    } = this.leaveForm.getRawValue();

    const payload = {
      empNo: employeeNoWithName ? this.commonService.userDetails.empNo : '',
      name: employeeNoWithName ? this.commonService.userDetails.name : '',
      leaveType: leaveType ? leaveType : '',
      leaveDuration: leaveDuration ? leaveDuration : '',
      fromDate: startDate ? startDate : '',
      toDate: endDate ? endDate : '',
      reasonType: leaveReasonType ? leaveReasonType : '',
      reasonComment: leaveReasonComment ? leaveReasonComment : '',
    };

    this.apiService
      .postApiCall(API_ENDPOINTS.SERVICE_SAVE_EMPLOYEE_LEAVE, payload)
      .subscribe({
        next: (res: any) => {
          console.log(
            `${API_ENDPOINTS.SERVICE_SAVE_EMPLOYEE_LEAVE} Response : `,
            res
          );

          this.commonService.openSnackbar(res.message, 'success');
          this.dialogRef.close('saved');
        },
        error: (error) => {
          this.commonService.openSnackbar(error.error.message, 'error');
        },
      });
  }

  loadUserDetails() {
    if (typeof window !== 'undefined') {
      const encryptedEmployeeNo =
        localStorage.getItem('empNo') || sessionStorage.getItem('empNo');
      const encryptedRole =
        localStorage.getItem('roleName') || sessionStorage.getItem('roleName');

      const encryptedEmployeeName =
        localStorage.getItem('userName') || sessionStorage.getItem('userName');

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
        encryptedEmployeeName &&
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

        this.EmployeeName = this.commonService.decryptWithKey(
          encryptedEmployeeName,
          this.commonService.secretKey
        );

        console.log(`User Name ${this.EmployeeNo}  Role Name ${this.RoleName}`);
      }
    }
  }

  approveReject(decision: 'Approved' | 'Rejected') {
    const { _id, name, empNo } = this.data.leaveRequest;
    if (decision === 'Approved') {
      // Directly call the approve API here
      const payload = {
        leaveId: _id || '',
        action: decision || '',
        role: this.RoleName || '',
        approverComment: 'Leave Approved',
        updatedBy: `${this.EmployeeName} [${this.EmployeeNo}]` || '',
      };
      this.sendDecision(payload);
    }

    if (decision === 'Rejected') {
      const dialogRef = this.dialog.open(RejectCommentDialogComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((comment) => {
        if (comment) {
          const payload = {
            leaveId: _id || '',
            action: decision || '',
            role: this.RoleName || '',
            approverComment: comment,
            updatedBy: `${this.EmployeeName} [${this.EmployeeNo}]` ||'',
          };
          this.sendDecision(payload);
        }
      });
    }
  }

  sendDecision(payload: any) {
    console.log(payload);
    this.apiService
      .postApiCall(API_ENDPOINTS.SERVICE_SAVE_EMPLOYEE_LEAVE_APPLICATION_APPROVE_REJECT, payload)
      .subscribe({
        next: (res: any) => {
          this.commonService.openSnackbar(res.message, 'success');
          this.dialogRef.close('decision');
        },
        error: (err) => {
          this.commonService.openSnackbar(err.error.message, 'error');
        },
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
