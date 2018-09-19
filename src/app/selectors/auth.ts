import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { State } from '../reducers';
import { State as AuthState } from '../reducers/auth';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthSelector {

  constructor(private store: Store<State>){}

  getToken(): Observable<string> {
    return this.store.select( state => state.auth.token);
  }

}