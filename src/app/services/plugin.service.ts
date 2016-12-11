import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PluginService {

  static BASE_URL: string = `${environment.apiUrl}`;

  constructor(private http: Http) {
  }

  getPlugins(){
    let url = `${PluginService.BASE_URL}/api/v1/plugin`;
    
    return this.http.get(url).map(res => res.json() || []);
  }

  updatePlugin(id, plugin){
    let url = `${PluginService.BASE_URL}/api/v1/plugin/${id}`;    
    return this.http.patch(url, plugin).map(res => res.json() || []);
  }

  flushCache(){
    let url = `${PluginService.BASE_URL}/cache/flush`;    
    return this.http.get(url).map(res => res.json() || []);
  }

}