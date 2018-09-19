import { NotificationAction } from './notification';
import { EndpointService } from './../services/endpoint.service';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';


export enum EndpointActions {
  ENDPOINT_SEARCH
};

export class SearchAction implements Action {
  type = EndpointActions[EndpointActions.ENDPOINT_SEARCH];

  constructor(public payload: any) { }
}


export type Actions = SearchAction;

@Injectable()
export class EndpointAction {

  constructor(private EndpointService: EndpointService, private store: Store<State>, private notificationAction: NotificationAction){}

  searchEndpoints(){
    this.EndpointService.getEndpoints().subscribe(data => {
      this.store.dispatch(new SearchAction(data));
      this.notificationAction.info('Endpoints obtained successfully');
    }, () => this.notificationAction.error('Error obtaining endpoints'));
  }

}