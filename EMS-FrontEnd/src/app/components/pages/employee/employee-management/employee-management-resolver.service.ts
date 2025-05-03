import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { forkJoin, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../../../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementResolverService {

  constructor(private apiService: ApiService) {}

  

  resolve(): Observable<any> {

    let roles = of({});
    let status = of({})

    let rolePayload = {
      
    }
    
    roles = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "Role" });
    status = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "Status" });


   return forkJoin({
    roles,
    status
    });
  }
}
