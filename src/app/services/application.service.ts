import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApplicationService {

  static BASE_URL: string = `${environment.apiUrl}`;

  constructor(private http: Http) {
  }

  getApplications(){
    let url = `${ApplicationService.BASE_URL}/auth/application`;

    return this.http.get(url).map(res => res.json() || []);
  }

  getApplicationBySlug(slug){
    let url = `${ApplicationService.BASE_URL}/auth/application/${slug}`;

    return this.http.get(url).map(res => res.json() || []);
  }

  getApplicationUsersBySlug(slug){
    let url = `${ApplicationService.BASE_URL}/auth/application/${slug}/user`;

    return this.http.get(url).map(res => res.json() || []);
  }

  addUser(slug, user){
    let url = `${ApplicationService.BASE_URL}/auth/application/${slug}/associate`;

    return this.http.post(url, user).map(res => res.json() || []);
  }

  createApplication(app){
    let url = `${ApplicationService.BASE_URL}/auth/application`;

    return this.http.post(url, app).map(res => res.json() || []);
  }

}
