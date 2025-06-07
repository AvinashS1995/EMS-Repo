import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api/api.service';
import { forkJoin, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolverService {

  constructor(private apiService: ApiService) {}

  

  resolve(): Observable<any> {

    let getUpcomingHoliday = of({});
    
    getUpcomingHoliday = this.apiService.getApiCall(API_ENDPOINTS.SERVICE_GET_UPCOMING_HOLIDAYS);


   return forkJoin({
    getUpcomingHoliday
    });
  }
}
