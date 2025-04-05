import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpService,) { }

   // Post request for Login and Signup
   menuApiCall(endPoint: string, request: any){
    return this.http.post(`${endPoint}`, request);
    
  }
}
