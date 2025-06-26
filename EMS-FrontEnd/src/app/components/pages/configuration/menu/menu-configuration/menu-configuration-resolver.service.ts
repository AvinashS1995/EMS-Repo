import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../shared/services/api/api.service';
import { API_ENDPOINTS } from '../../../../../shared/constant';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuConfigurationResolverService {

  constructor(private apiService: ApiService) {}

  
  resolve(): Observable<any> {

    let menuStatus = of({})
    
    menuStatus = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "EmployeeStatus" });


   return forkJoin({
    menuStatus,
    });
  }
}
