import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { forkJoin, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../../../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationResolverService {

  constructor(private apiService: ApiService) {}

  

  resolve(): Observable<any> {

    let roles = of({});
    let filterRoles = of({})
    
    roles = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, { entityValue: "type" });
    filterRoles = this.apiService.postApiCall(API_ENDPOINTS.SERVICE_GETROLETYPE, {});


   return forkJoin({
    roles,
    filterRoles
    });
  }
}
