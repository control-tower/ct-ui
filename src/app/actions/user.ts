import { NotificationAction } from './notification';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';


export enum UserActions {
  USER_SEARCH
};

export class SearchAction implements Action {
  type = UserActions[UserActions.USER_SEARCH];

  constructor(public payload: any) { }
}


export type Actions = SearchAction;

@Injectable()
export class UserAction {

  constructor(private userService: UserService, private store: Store<State>, private notificationAction: NotificationAction){}

  searchUsers(){
    this.userService.getUsers().subscribe(data => {
      this.store.dispatch(new SearchAction(data));
      this.notificationAction.info('Users obtained successfully');
    }, () => this.notificationAction.error('Error obtaining users'));
  }

  updateUser(id, user){
    this.userService.updateUser(id, user).subscribe(() => {
      this.notificationAction.info('User update successfully');
      this.searchUsers()
    }, () => this.notificationAction.error('Error updating user'));
  }

  createUser(user){
    this.userService.createUser(user).subscribe(() => {
      this.notificationAction.info('User created successfully');
      this.searchUsers()
    }, (e) => {
      console.log(e);
       this.notificationAction.error(`Error creating user: ${e}`);

    });
  }

}
