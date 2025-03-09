import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/'

  constructor(
    private http: HttpClient,
  ) { }

  // Post request for Login and Signup
  authApiCall(endPoint: string, request: any){
    return this.http.post(`${this.apiUrl}${endPoint}`, request,);
    
  }
}
