import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../shared/services/api/api.service';
import { CommonService } from '../../../../../shared/services/common/common.service';
import { forkJoin, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../../../../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuConfigurationResolverService {

  constructor(private apiService: ApiService, private commonService: CommonService) {}

  

  resolve(): Observable<any> {

    let menus = of({});
    
    menus = this.apiService.getApiCall(API_ENDPOINTS.SERVICE_GETMENUS);


   return forkJoin({
    menus,
    });
  }
}
