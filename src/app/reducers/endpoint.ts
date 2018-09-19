import { IEndpoint } from './../models/endpoint';
import * as endpoint from '../actions/endpoint';


export interface State {
  entities: IEndpoint[]
};

const initialState: State = {
  entities: []
};

export function reducer(state = initialState, action: endpoint.Actions): State {
  switch (action.type) {
    case endpoint.EndpointActions[endpoint.EndpointActions.ENDPOINT_SEARCH]:
      return {
        entities: action.payload
      }
    default:
      return state;
  }
}