import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { URLSearchParams } from "@angular/http";

@Injectable()
export class LoggedInGuard implements CanActivate {

  static BASE_URL: string = `https://production-api.globalforestwatch.org/auth`;

  constructor(private authService: AuthService) { }

  canActivate(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.authService.isLoggedIn().then(() => {
        let params = new URLSearchParams(window.location.search.substring(1, window.location.search.length));
        let token = params.get('token');
        if (!token) {
          resolve(true);
        } else {
          params.paramsMap.delete('token');
          window.location.href = `${window.location.href.split(/[?#]/)[0]}${params.toString ? '': '?'}${params.toString()}`;
        }
      }, () => {
        reject();
        window.location.href = `${LoggedInGuard.BASE_URL}?token=true&callbackUrl=${`${window.location.protocol}//${window.location.host}${window.location.pathname}`}`;
      });
    });
  }
}
