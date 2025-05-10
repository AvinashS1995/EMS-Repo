import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../../shared/services/api/api.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { API_ENDPOINTS, CheckInsStep } from '../../../../shared/constant';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-ins',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './check-ins.component.html',
  styleUrl: './check-ins.component.scss'
})
export class CheckInsComponent {

  checkInsForm!: FormGroup;

  currentStep: CheckInsStep = CheckInsStep.INITIAL; // Initial step
  CheckInsStep = CheckInsStep;

  UserEmail: string = '';

  constructor(
      private fb: FormBuilder,
          private router: Router,
          private apiService: ApiService,
          private commonService: CommonService,
          private dialog: MatDialog,
          private dialogRef: MatDialogRef<CheckInsComponent>,
          @Inject(MAT_DIALOG_DATA) public data: any
  
    ) {
  
    }

  ngOnInit(): void {
    this.prepareCheckInsForm();
    this.loadUserEmail();

  }

  prepareCheckInsForm() {
    this.checkInsForm = this.fb.group({
      otp: ['']
    })
  }

  onCheckInsSubmit() {

    const payload = {
      email: this.UserEmail ? this.UserEmail : '',
    };

    if (this.checkInsForm.valid) {
      this.apiService.postApiCall(
        API_ENDPOINTS.SERVICE_SEND_CHECK_INS_OTP,
        payload
      ).subscribe({
        next: (res: any) => {
          console.log(`${API_ENDPOINTS.SERVICE_SEND_CHECK_INS_OTP} Response : `, res);

          this.currentStep = CheckInsStep.SEND_OTP;

          this.commonService.openSnackbar(res.message, 'success');
        },
        error: (error) => {
          this.commonService.openSnackbar(error.error.message, 'error');
        },
      });
    }
    
  }

  onVerifyCheckInsOtp() {

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


  cancel() {
    this.dialogRef.close();
  }
}
