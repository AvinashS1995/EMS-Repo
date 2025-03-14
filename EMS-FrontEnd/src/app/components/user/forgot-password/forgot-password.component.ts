import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonService } from '../../../shared/services/common/common.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';
import { API_ENDPOINTS } from '../../../shared/constant';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{

  forgotPasswordForm!: FormGroup
  isValidEmail:boolean = false;

  constructor(
      private fb: FormBuilder,
      private AuthService: AuthService,
      private router: Router,
      private commonService: CommonService,
    ){}

  ngOnInit(): void {
    this.prepareForgotPasswordForm();
  }

  prepareForgotPasswordForm () {
    this.forgotPasswordForm = this.fb.group({
          email: ['', Validators.required],
          // oldPassword: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD_REGEX)]]
          oldPassword: ['',],
          newPassword: ['', ],
          confirmPassword: ['',],
        });
  }

  onForgotPasswordSubmit () {

  console.log(this.forgotPasswordForm.getRawValue())

  const {email} = this.forgotPasswordForm.getRawValue();

  const payload = {
    email : email
  }

  if (this.forgotPasswordForm.valid) {
    this.AuthService.authApiCall(API_ENDPOINTS.serviceNaame_VerifyEmail, payload).subscribe((res:any) => {
      this.isValidEmail = true;
      console.log(`${API_ENDPOINTS.serviceNaame_VerifyEmail} Response : `, res);
      if (this.isValidEmail) {
        this.forgotPasswordForm.controls['email'].disable();
        this.forgotPasswordForm.controls['oldPassword'].addValidators([Validators.required])
        this.forgotPasswordForm.controls['newPassword'].addValidators([Validators.required])
        this.forgotPasswordForm.controls['confirmPassword'].addValidators([Validators.required])
      
      }

      this.commonService.openSnackbar(res.message, 'success')
    }, (error) => {
      this.commonService.openSnackbar(error.error.message, "error")
    })
  }
  }

  onCancel () {
    this.router.navigateByUrl("/")
  }

}
