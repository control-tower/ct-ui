import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class MicroserviceService {

  static BASE_URL: string = `${environment.apiUrl}`;

  constructor(private http: Http) {
  }

  getMicroservices(){
    let url = `${MicroserviceService.BASE_URL}/api/v1/microservice`;
    
    return this.http.get(url).map(res => res.json() || []);
  }

}