import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../../../shared/constant';
import { ApiService } from '../../../../../shared/services/api/api.service';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleWiseMenuConfigurationResolverService {

  constructor(private apiService: ApiService) {}

  resolve(): Observable<any> {

    let roles = of({});
    
    roles = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "Role" });


   return forkJoin({
    roles,
    });
  }
}
