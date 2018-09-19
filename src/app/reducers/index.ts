import { combineLatest } from 'rxjs/observable/combineLatest';
import { ActionReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as microservice from './microservice';
import * as endpoint from './endpoint';
import * as user from './user';
import * as auth from './auth';
import * as dashboard from './dashboard';
import * as plugin from './plugin';


export interface State {
  microservice: microservice.State
  endpoint: endpoint.State
  user: user.State
  auth: auth.State
  dashboard: dashboard.State
  plugin: plugin.State
}

const reducers = {
  router: routerReducer,
  microservice: microservice.reducer,
  endpoint: endpoint.reducer,
  user: user.reducer,
  auth: auth.reducer,
  dashboard: dashboard.reducer,
  plugin: plugin.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}