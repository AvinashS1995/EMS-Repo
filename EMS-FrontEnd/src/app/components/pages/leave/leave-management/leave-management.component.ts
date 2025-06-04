import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../shared/services/api/api.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ApplyLeaveComponent } from '../apply-leave/apply-leave.component';

@Component({
  selector: 'app-leave-management',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './leave-management.component.html',
  styleUrl: './leave-management.component.scss'
})
export class LeaveManagementComponent {
  leaveType: Array<any> = [];
  leaveReasonType: Array<any> = [];
  upcomingHolidays: Array<any> = [];;

   constructor(
      private router: Router,
      private fb: FormBuilder,
      private dialog: MatDialog,
      private activateRoute: ActivatedRoute,
      private apiService: ApiService,
      private commonService: CommonService
    ) {}


    ngOnInit(): void {
      this.getparams();
    }


    getparams() {

      this.activateRoute.data.subscribe(params => {
        console.log("Params Leave Management ---->", params)

        if (params['data']) {
          this.leaveType = params['data'].leaveType?.data?.types || [];
          this.leaveType = this.leaveType.map((item) => {
            return {
              value: item.typeValue,
              label: item.typeLabel,
            };
          });
  
          console.log('Leave Type--->', this.leaveType);

          this.leaveReasonType = params['data'].leaveReasonType?.data?.types || [];
          this.leaveReasonType = this.leaveReasonType.map((item) => {
            return {
              value: item.typeValue,
              label: item.typeLabel,
            };
          });
  
          console.log('Leave Reason Type--->', this.leaveReasonType);

          this.upcomingHolidays = params['data'].getUpcomingHoliday?.data?.upComingHolidays || [];
  
          console.log('Upcoming Holidays--->', this.upcomingHolidays);
  
        }
      })
    }
  

  applyLeave() {

    const dialogRef = this.dialog.open(ApplyLeaveComponent, {
          width: '900px',
          maxWidth: '90vw',
          minHeight: '75vh',
          disableClose: true,
          data: {
            leaveType: this.leaveType,
            leaveReasonType: this.leaveReasonType,
            upcomingHolidays: this.upcomingHolidays

          },
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result === 'saved' || result === 'updated') {
            
          }
        });
  }
}
