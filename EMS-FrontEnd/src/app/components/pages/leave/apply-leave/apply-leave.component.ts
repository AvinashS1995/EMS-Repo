import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ApiService } from '../../../../shared/services/api/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, keyframes, query, stagger, style, transition, trigger, AnimationEvent } from '@angular/animations';

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


  constructor(
      private fb: FormBuilder,
          private router: Router,
          private apiService: ApiService,
          private commonService: CommonService,
          private dialog: MatDialog,
          private dialogRef: MatDialogRef<any>,
          @Inject(MAT_DIALOG_DATA) public data: any
  
    ) {
  
    }

    ngOnInit(): void {
      console.log(this.data);
      this.prepareCreateLeaveForm();
      this.leaveTypeList = this.data.leaveType || [];

      // console.log(this.leaveTypeList);

      this.leaveReasonTypeList = this.data.leaveReasonType || [];

      // console.log(this.leaveReasonTypeList);
      
    }

    prepareCreateLeaveForm() {
      this.leaveForm = this.fb.group({
        leaveType: [" ", Validators.required],
        shift: [" ", Validators.required],
        startDate: [" ", Validators.required],
        endDate: [" ", Validators.required],
        leaveReasonType: [" ", Validators.required],
        leaveReasonComment: [" ", Validators.required],
      })
    }

    ApplyLeave() {
      console.log(this.leaveForm.getRawValue());
      
    }

  closeDialog() {
    this.dialogRef.close();
  }
}
