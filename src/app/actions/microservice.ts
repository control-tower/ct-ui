import { NotificationAction } from './notification';
import { MicroserviceService } from './../services/microservice.service';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';


export enum MicroserviceActions {
  MICROSERVICE_SEARCH
};

export class SearchAction implements Action {
  type = MicroserviceActions[MicroserviceActions.MICROSERVICE_SEARCH];

  constructor(public payload: any) { }
}


export type Actions = SearchAction;

@Injectable()
export class MicroserviceAction {

  constructor(private microserviceService: MicroserviceService, private store: Store<State>, private notificationAction: NotificationAction){}

  searchMicroservices(){
    this.microserviceService.getMicroservices().subscribe(data => {
      this.store.dispatch(new SearchAction(data));
      this.notificationAction.info('Microservices obtained successfully');
    }, () => this.notificationAction.error('Error obtaining microservices'));
  }

}