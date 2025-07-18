import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../../../shared/constant';
import { ApiService } from '../../../../shared/services/api/api.service';
import { CommonService } from '../../../../shared/services/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveManagementResolverService {

  constructor(private apiService: ApiService, private commonService: CommonService) {}

  

  resolve(): Observable<any> {

    let leaveType = of({});
    let leaveReasonType = of({});
    let status = of({});
    let employeeLeaveList = of({});
    let getUpcomingHoliday = of({});
    
    leaveType = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "leaveType" });
    leaveReasonType = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "leaveReasonType" });
    status = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "Status" });
    const payload = {
      empNo: this.commonService.userDetails.empNo || ''
    }
    employeeLeaveList = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GET_EMPLOYEE_LEAVE, payload);
    getUpcomingHoliday = this.apiService.getApiCall(API_ENDPOINTS.SERVICE_GET_UPCOMING_HOLIDAYS);




   return forkJoin({
    leaveType,
    leaveReasonType,
    status,
    employeeLeaveList,
    getUpcomingHoliday
    });
  }
}
