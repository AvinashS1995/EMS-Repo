import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../../../shared/constant';
import { ApiService } from '../../../../shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveManagementResolverService {

  constructor(private apiService: ApiService) {}

  

  resolve(): Observable<any> {

    let leaveType = of({});
    let leaveReasonType = of({});
    let status = of({});
    let employeeLeaveList = of({});
    
    leaveType = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "leaveType" });
    leaveReasonType = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "leaveReasonType" });
    status = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "Status" });
    employeeLeaveList = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GET_EMPLOYEE_LEAVE, {});



   return forkJoin({
    leaveType,
    leaveReasonType,
    status,
    employeeLeaveList
    });
  }
}
