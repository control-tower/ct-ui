import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {

  static BASE_URL: string = `${environment.apiUrl}`;

  constructor(private http: Http) {
  }

  countRequestToday(){
    let url = `${DashboardService.BASE_URL}/api/v1/stadistic/countRequestToday`;    
    return this.http.get(url).map(res => res.json() || []);
  }

  countRequestLastWeek(){
    let url = `${DashboardService.BASE_URL}/api/v1/stadistic/countRequestLastWeek`;    
    return this.http.get(url).map(res => res.json() || []);
  }

  countRequestTodayByCountry(){
    let url = `${DashboardService.BASE_URL}/api/v1/stadistic/countRequestTodayByCountry`;    
    return this.http.get(url).map(res => res.json() || []);
  }

  avgByRequest(from, to){
    let url = `${DashboardService.BASE_URL}/api/v1/stadistic/avgByRequest?from=${from}&to=${to}`;    
    return this.http.get(url).map(res => res.json() || []);
  }

  requestByDay(from, to){
    let url = `${DashboardService.BASE_URL}/api/v1/stadistic/requestByDay?from=${from}&to=${to}`;    
    return this.http.get(url).map(res => res.json() || []);
  }

}