import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../../shared/constant';
import { forkJoin, Observable, of } from 'rxjs';
import { ApiService } from '../../../../shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AttendenceManagementResolverService {

  constructor(private apiService: ApiService) {}

  

  resolve(): Observable<any> {

    let attendenceStatus = of({});
    let todayAttendenceSummary = of({});
    
    attendenceStatus = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "AttendenceStatus" });
    todayAttendenceSummary = this.apiService.getApiCall(API_ENDPOINTS.SERVICE_GET_USER_ATTENDENCE_TODAY_SUMMARY);


   return forkJoin({
    attendenceStatus,
    todayAttendenceSummary
    });
  }
}
