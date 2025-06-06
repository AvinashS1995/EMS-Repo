import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonService } from '../../../shared/services/common/common.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';
import { API_ENDPOINTS, ForgotPasswordStep } from '../../../shared/constant';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  currentStep: ForgotPasswordStep = ForgotPasswordStep.VERIFY_EMAIL; // Initial step
  ForgotPasswordStep = ForgotPasswordStep; // Expose Enum to HTML
  resendOtpDisabled = false;
  countdown = 60; // Initial countdown value
  countdownSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.prepareForgotPasswordForm();
  }

  prepareForgotPasswordForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required],
      otp: [''],
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  onForgotPasswordSubmit() {
    switch (this.currentStep) {
      case ForgotPasswordStep.VERIFY_EMAIL:
        this.onVerifyEmail();
        break;
      case ForgotPasswordStep.SEND_OTP:
        this.onSendOtp();
        break;
      case ForgotPasswordStep.VERIFY_OTP:
        this.onVerifyOtp();
        break;
      case ForgotPasswordStep.RESET_PASSWORD:
        this.onResetpassword();
        break;
    }
  }

  onVerifyEmail() {
    console.log(this.forgotPasswordForm.getRawValue());

    const { email } = this.forgotPasswordForm.getRawValue();

    const payload = {
      email: email,
    };

    if (this.forgotPasswordForm.valid) {
      this.AuthService.authApiCall(
        API_ENDPOINTS.SERVICE_VERIFYEMAIL,
        payload
      ).subscribe({
        next: (res: any) => {
          console.log(`${API_ENDPOINTS.SERVICE_VERIFYEMAIL} Response : `, res);

          this.forgotPasswordForm.controls['email'].disable();
          this.forgotPasswordForm.controls['otp'].disable();
          this.forgotPasswordForm.controls['oldPassword'].addValidators([
            Validators.required,
          ]);
          this.forgotPasswordForm.controls['newPassword'].addValidators([
            Validators.required,
          ]);
          this.forgotPasswordForm.controls['confirmPassword'].addValidators([
            Validators.required,
          ]);

          this.currentStep = ForgotPasswordStep.SEND_OTP;

          this.commonService.openSnackbar(res.message, 'success');
        },
        error: (error) => {
          this.commonService.openSnackbar(error.error.message, 'error');
        },
      });
    }
  }

  onSendOtp() {
    const { email } = this.forgotPasswordForm.getRawValue();

    let payload = {
      email: email,
    };

    this.AuthService.authApiCall(
      API_ENDPOINTS.SERVICE_SENDOTP,
      payload
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.commonService.openSnackbar(res.message, 'success');
        this.currentStep = ForgotPasswordStep.VERIFY_OTP;
        this.forgotPasswordForm.controls['otp'].enable();

        // Start countdown after sending OTP
        this.startResendOtpCountdown();
      },
      error: (error) => {
        this.commonService.openSnackbar(error.error.message, 'error');
      },
    });
  }

  onVerifyOtp() {
    const { email, otp } = this.forgotPasswordForm.getRawValue();

    const payload = {
      email: email,
      otp: otp,
    };
    this.AuthService.authApiCall(
      API_ENDPOINTS.SERVICE_VERIFYOTP,
      payload
    ).subscribe({
      next: (res: any) => {
        console.log(res);

        this.commonService.openSnackbar(res.message, 'success');
        this.currentStep = ForgotPasswordStep.RESET_PASSWORD;
        this.forgotPasswordForm.controls['otp'].disable();
      },
      error: (error) => {
        this.commonService.openSnackbar(error.error.message, 'error');
      },
    });
  }

  onResendOtp() {
    const { email } = this.forgotPasswordForm.getRawValue();

    let payload = {
      email: email,
    };

    this.AuthService.authApiCall(
      API_ENDPOINTS.SERVICE_RESENDOTP,
      payload
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.commonService.openSnackbar(res.message, 'success');
        // Restart the countdown
        this.startResendOtpCountdown();
      },
      error: (error) => {
        this.commonService.openSnackbar(error.error.message, 'error');
      },
    });
  }

  onResetpassword() {
    const { email, newPassword, confirmPassword } =
      this.forgotPasswordForm.getRawValue();

    const payload = {
      email: email,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    this.AuthService.authApiCall(
      API_ENDPOINTS.SERVICE_RESETPASSWORD,
      payload
    ).subscribe({
      next: (res: any) => {
        console.log(res);

        this.commonService.openSnackbar(res.message, 'success');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        this.commonService.openSnackbar(error.error.message, 'error');
      },
    });
  }

  startResendOtpCountdown() {
    this.resendOtpDisabled = true;
    this.countdown = 60;

    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.resendOtpDisabled = false;
        this.countdownSubscription.unsubscribe();
      }
    });
  }

  onCancel() {
    this.router.navigateByUrl('/');
  }
}
