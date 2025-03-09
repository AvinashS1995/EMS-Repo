import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { API_ENDPOINTS, REGEX } from '../../../shared/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/api/auth.service';
import { Router } from '@angular/router';

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
  ){}
  
  ngOnInit(){
    this.buildForm();
  }
  
  buildForm(){
    // Login form
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      // password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD_REGEX)]]
      password: ['', [Validators.required]]
    });
    
  }

  

  onLoginSubmit(){
    console.log(this.loginForm);
    if(this.loginForm.valid){
      this.AuthService.authApiCall(API_ENDPOINTS.serviceName_login, this.loginForm.value).subscribe((resp: any) => {
        console.log(`${API_ENDPOINTS.serviceName_login} Response : `, resp);
        
          // this.router.navigateByUrl('/dashboard')
        
      })
    }else{

    }
    
  }
  
  
}
