import { Observable } from 'rxjs/Rx';
import { IApplication } from './../models/application.model';
import { NotificationAction } from './notification';
import { ApplicationService } from './../services/application.service';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';


export enum ApplicationActions {
  APPLICATION_SEARCH,
  APPLICATION_GET_APPLICATION,
  APPLICATION_GET_USERS_APPLICATION
};

export class SearchAction implements Action {
  type = ApplicationActions[ApplicationActions.APPLICATION_SEARCH];

  constructor(public payload: any) { }
}

export class GetApplicationAction implements Action {
  type = ApplicationActions[ApplicationActions.APPLICATION_GET_APPLICATION];

  constructor(public payload: IApplication) { }
}


export type Actions = SearchAction;

@Injectable()
export class ApplicationAction {

  constructor(private applicationService: ApplicationService, private store: Store<State>, private notificationAction: NotificationAction){}

  searchApplications(){
    this.applicationService.getApplications().subscribe(data => {
      this.store.dispatch(new SearchAction(data));
      this.notificationAction.info('Applications obtained successfully');
    }, () => this.notificationAction.error('Error obtaining Applications'));
  }


  createApplication(app){
    this.applicationService.createApplication(app).subscribe(data => {
      this.notificationAction.info('Application created successfully');
      this.searchApplications();
    }, (e) => {
      console.log(e);
      this.notificationAction.error(`Error creating application: ${e}`);
    });
  }

  addUser(slug, user){
    this.applicationService.addUser(slug, user).subscribe(() => {
      this.notificationAction.info('User added successfully');
      this.getApplicationBySlug(slug);
    }, (e) => {
      console.log(e);
       this.notificationAction.error(`Error adding user: ${e}`);

    });
  }

  getApplicationBySlug(slug){
    const appObservable = this.applicationService.getApplicationBySlug(slug)
    const usersObservable = this.applicationService.getApplicationUsersBySlug(slug);
    Observable.forkJoin(appObservable, usersObservable).subscribe(data => {
      const app = data[0];
      app.users = data[1].map((user) => {
        if (user.roles){
          let role = user.roles.find((rol) => rol.application === app._id);
          if (role) {
            user.role = role.role;
          }
        }
        return user;
      });
      this.store.dispatch(new GetApplicationAction(app));
      this.notificationAction.info('Application obtained successfully');
    }, () => this.notificationAction.error('Error obtaining Application'));
  }
}
