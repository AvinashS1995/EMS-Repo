import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../../shared/constant';
import { forkJoin, Observable, of } from 'rxjs';
import { ApiService } from '../../../../shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveApprovalRequestListResolverService {

  constructor(private apiService: ApiService) {}

  

  resolve(): Observable<any> {

    let leaveType = of({});
    let leaveReasonType = of({});
    
    leaveType = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "leaveType" });
    leaveReasonType = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "leaveReasonType" });


   return forkJoin({
    leaveType,
    leaveReasonType,
    });
  }
}
