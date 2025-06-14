import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../shared/services/api/api.service';
import { CommonService } from '../../../../../shared/services/common/common.service';
import { forkJoin, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../../../../shared/constant';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuConfigurationResolverService {

  constructor(private apiService: ApiService, private commonService: CommonService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {

    let menus = of({});
    let menuDetails = of({});

    if(route.queryParams['data']) {
      const decrypted = this.commonService.decryptByAEStoString(route.queryParams['data']);
      menuDetails = of(decrypted)
    }
    menus = this.apiService.getApiCall(API_ENDPOINTS.SERVICE_GETMENUS);


   return forkJoin({
    menus,
    menuDetails
    });
  }
}
