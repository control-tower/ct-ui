import { ApplicationAction } from './application.action';
import { PluginAction } from './plugin';
import { NotificationAction } from './notification';
import { DashboardAction } from './dashboard';
import { AuthAction } from './auth';
import { UserAction } from './user';
import { EndpointAction } from './endpoint';
import { MicroserviceAction } from './microservice';


export var ACTIONS: Array<any> = [
  { provide: MicroserviceAction, useClass: MicroserviceAction },
  { provide: EndpointAction, useClass: EndpointAction },
  { provide: UserAction, useClass: UserAction },
  { provide: AuthAction, useClass: AuthAction },
  { provide: DashboardAction, useClass: DashboardAction },
  { provide: NotificationAction, useClass: NotificationAction },
  { provide: PluginAction, useClass: PluginAction },
  { provide: ApplicationAction, useClass: ApplicationAction },
];
