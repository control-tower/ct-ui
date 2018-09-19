import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EndpointService {

  static BASE_URL: string = `${environment.apiUrl}`;

  constructor(private http: Http) {
  }

  getEndpoints(){
    let url = `${EndpointService.BASE_URL}/api/v1/endpoint`;
    
    return this.http.get(url).map(res => res.json() || []);
  }

}