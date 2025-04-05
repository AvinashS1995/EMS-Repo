import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { API_ENDPOINTS, REGEX } from '../../../shared/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/api/auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../shared/services/common/common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    private commonService: CommonService,
  ){}
  
  ngOnInit(){
    this.buildForm();
  }
  
  buildForm(){
    // Login form
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      // password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD_REGEX)]]
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
    
  }

  

  onLoginSubmit(){
    console.log(this.loginForm);
    let { rememberMe } = this.loginForm.getRawValue();
    if(this.loginForm.valid){
      this.AuthService.authApiCall(API_ENDPOINTS.serviceName_login, this.loginForm.value).subscribe((resp: any) => {
        console.log(`${API_ENDPOINTS.serviceName_login} Response : `, resp);
        if (resp.token) {
          if (rememberMe) {
            localStorage.setItem('token', resp.token);
          } else {
            sessionStorage.setItem('token', resp.token);
          }
          this.commonService.openSnackbar(resp.message, 'success');
          this.router.navigateByUrl('/dashboard')
        }  
      }, (error) => {
        this.commonService.openSnackbar(error.error.message, 'error');
      })
    }else{

    }
    
  }

  onForgotPassword () {
      this.router.navigateByUrl('/forgot-password')
  }
  
  
}
