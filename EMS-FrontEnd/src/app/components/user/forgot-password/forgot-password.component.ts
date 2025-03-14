import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonService } from '../../../shared/services/common/common.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';

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
          oldPassword: ['', [Validators.required]],
          newPassword: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]],
        });
  }

  onForgotPasswordSubmit () {

  }

  onCancel () {
    this.router.navigateByUrl("/")
  }

}
