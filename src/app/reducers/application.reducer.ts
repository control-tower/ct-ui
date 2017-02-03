import { IApplication } from './../models/application.model';
import * as application from '../actions/application.action';


export interface State {
  entities: IApplication[]
  detail: IApplication
};

const initialState: State = {
  entities: [],
  detail: null
};

export function reducer(state = initialState, action: application.Actions): State {
  switch (action.type) {
    case application.ApplicationActions[application.ApplicationActions.APPLICATION_SEARCH]:
      return Object.assign({}, state, {
        entities: action.payload
      });
    case application.ApplicationActions[application.ApplicationActions.APPLICATION_GET_APPLICATION]:
      return Object.assign({}, state, {
        detail: action.payload
      });
    default:
      return state;
  }
}
