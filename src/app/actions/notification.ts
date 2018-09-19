import { NotificationsService } from 'angular2-notifications';
import { Injectable } from '@angular/core';


@Injectable()
export class NotificationAction {

  constructor(private notificationService: NotificationsService){}

  info(description){
    this.notificationService.info('Success', description);
  }

  error(description){
    this.notificationService.error('Error', description);
  }

}