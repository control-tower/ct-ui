import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  static BASE_URL: string = `${environment.apiUrl}/auth`;

  constructor(private http: Http) {
  }

  logout(): any {
    localStorage.removeItem('username');
  }

  isLoggedIn(): Promise<any> {   
    return this.http.get(`${AuthService.BASE_URL}/check-logged`).toPromise();    
  }

  generateToken() {
    return this.http.get(`${AuthService.BASE_URL}/generate-token`).map(res => res.json());
  }
}

@Injectable()
export class TokenService {
  
  constructor() {
  }

  logout(): any {
    localStorage.removeItem('token');
    window.location.href = `${environment.apiUrl}/auth?token=true&callbackUrl=${`${window.location.protocol}//${window.location.host}/${window.location.pathname}`}`;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  
}

export var AUTH_PROVIDERS: Array<any> = [
  { provide: TokenService, useClass: TokenService },
  { provide: AuthService, useClass: AuthService }
];
