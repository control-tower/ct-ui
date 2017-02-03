import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  static BASE_URL: string = `${environment.apiUrl}/auth`;

  _user: any;

  constructor(private http: Http) {
  }

  logout(): any {
    localStorage.removeItem('username');
  }

  isLoggedIn(): Promise<any> {
    return this.http.get(`${AuthService.BASE_URL}/check-logged`).map(res => res.json()).toPromise().then((data) => this._user = data);
  }

  get user() {
    return this._user;
  }

  getRoleInApp(slug) {
    if (this._user && this._user.roles) {
      const app = this._user.roles.find((role) => role.name === slug);
      if (app) {
        return app.role;
      }
    }
    return null;
  }

  getApplications() {
    if (this._user && this._user.roles) {
      return this._user.roles.map((role) => role.name );
    }
    return [];
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
    window.location.href = `${environment.apiUrl}/auth?token=true&callbackUrl=${`${window.location.protocol}//${window.location.host}${window.location.pathname}`}`;
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
