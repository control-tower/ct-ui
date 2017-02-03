import { NotificationAction } from './notification';
import { AuthService, TokenService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';


export enum AuthActions {
  AUTH_GENERATE_TOKEN
};

export class GenerateTokenAction implements Action {
  type = AuthActions[AuthActions.AUTH_GENERATE_TOKEN];

  constructor(public payload: any) { }
}


export type Actions = GenerateTokenAction;

@Injectable()
export class AuthAction {

  constructor(private authService: AuthService, private store: Store<State>, private notificationAction: NotificationAction, private tokenService: TokenService){}

  generateToken(){
    this.authService.generateToken().subscribe(data => {
      this.store.dispatch(new GenerateTokenAction(data.token));
      this.notificationAction.info('Token generated successfully');
      this.tokenService.setToken(data.token);
    }, () => this.notificationAction.error('Error generating token'));
  }

  initToken() {
    this.store.dispatch(new GenerateTokenAction(this.tokenService.getToken()));
  }

}
