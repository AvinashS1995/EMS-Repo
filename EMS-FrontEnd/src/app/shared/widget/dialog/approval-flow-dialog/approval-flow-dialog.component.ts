import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { API_ENDPOINTS } from '../../../constant';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-approval-flow-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './approval-flow-dialog.component.html',
  styleUrl: './approval-flow-dialog.component.scss'
})
export class ApprovalFlowDialogComponent {

  approvalSteps: any[] = [];
  isLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { leaveId: string },
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const payload = {
      leaveId: this.data.leaveId 
    }
  
    this.apiService.postApiCall(API_ENDPOINTS.SERVICE_APPLICATION_APPROVAL_FLOW, payload).subscribe({
      next: (res: any) => {
        const leave = res.data;
        this.approvalSteps = [
          {
          label: 'Submitted by Employee',
          status: 'Submitted',
          comment: leave.reasonComment,
          createdBy: `${leave.empNo} - ${leave.name}`,
          date: leave.createAt
        },
          {
            label: 'Team Lead',
            status: `${leave.leaveStatus === 'Pending for TL' || leave.leaveStatus.includes('TL') ? leave.leaveStatus : 'Approved'} (${leave.tlApprover})`,
            comment: leave.approverComment,
            updatedBy: leave.updatedBy,
            date: leave.updateAt
          },
          {
            label: 'Manager',
            status: `${leave.leaveStatus === 'Pending for Manager' || leave.leaveStatus.includes('Manager') ? leave.leaveStatus : ''} (${leave.managerApprover})` ,
            comment: leave.approverComment,
            updatedBy: leave.updatedBy,
            date: leave.updateAt
          },
          {
            label: 'HR',
            status: `${leave.leaveStatus === 'Pending for HR' || leave.leaveStatus.includes('HR') || leave.leaveStatus === 'Final Approved' ? leave.leaveStatus : ''} (${leave.hrApprover})`,
            comment: leave.approverComment,
            updatedBy: leave.updatedBy,
            date: leave.updateAt
          },
        ];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
