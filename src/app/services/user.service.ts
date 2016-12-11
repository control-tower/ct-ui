import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  static BASE_URL: string = `${environment.apiUrl}`;

  constructor(private http: Http) {
  }

  getUsers(){
    let url = `${UserService.BASE_URL}/auth/user`;
    
    return this.http.get(url).map(res => res.json() || []);
  }

  updateUser(id, user){
    let url = `${UserService.BASE_URL}/auth/user/${id}`;
    return this.http.patch(url, user).map(res => res.json() || {});
  }

  createUser(user){
    let url = `${UserService.BASE_URL}/auth/sign-up`;
    return this.http.post(url, user).map(res => res.json() || {});
  }

}