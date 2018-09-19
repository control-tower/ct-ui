import { PluginService } from './plugin.service';
import { UserService } from './user.service';
import { EndpointService } from './endpoint.service';
import { MicroserviceService } from './microservice.service';
import { DashboardService } from './dashboard.service';
import { AuthService, TokenService } from './auth.service';


export var SERVICES: Array<any> = [
  { provide: TokenService, useClass: TokenService },
  { provide: AuthService, useClass: AuthService }, 
  { provide: MicroserviceService, useClass: MicroserviceService }, 
  { provide: EndpointService, useClass: EndpointService }, 
  { provide: UserService, useClass: UserService }, 
  { provide: DashboardService, useClass: DashboardService }, 
  { provide: PluginService, useClass: PluginService }, 
];