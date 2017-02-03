import { ApplicationSelector } from './application.selector';
import { PluginSelector } from './plugin';
import { DashboardSelector } from './dashboard';
import { AuthSelector } from './auth';
import { UserSelector } from './user';
import { EndpointSelector } from './endpoint';
import { MicroserviceSelector } from './microservice';


export var SELECTORS: Array<any> = [
  { provide: MicroserviceSelector, useClass: MicroserviceSelector },
  { provide: EndpointSelector, useClass: EndpointSelector },
  { provide: UserSelector, useClass: UserSelector },
  { provide: AuthSelector, useClass: AuthSelector },
  { provide: DashboardSelector, useClass: DashboardSelector },
  { provide: PluginSelector, useClass: PluginSelector },
  { provide: ApplicationSelector, useClass: ApplicationSelector },

];
