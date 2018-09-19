import { NgModule, Injectable } from '@angular/core';
import { RequestOptions, RequestOptionsArgs, RequestMethod, Headers } from '@angular/http';
import { TokenService } from './auth.service';

@Injectable()
export class OauthRequestOptions extends RequestOptions {
  constructor (private tokenService: TokenService) {
    super();
    
  }
  merge(options?:RequestOptionsArgs):RequestOptions {
    if (!options.headers) {
      options.headers = new Headers();
    }
    options.headers.append('Authorization', `Bearer ${this.tokenService.getToken()}`);    
    return super.merge(options);
  }
} 