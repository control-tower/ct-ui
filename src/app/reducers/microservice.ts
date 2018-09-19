import { IMicroservice } from './../models/microservice';
import * as microservice from '../actions/microservice';


export interface State {
  entities: IMicroservice[]
};

const initialState: State = {
  entities: []
};

export function reducer(state = initialState, action: microservice.Actions): State {
  switch (action.type) {
    case microservice.MicroserviceActions[microservice.MicroserviceActions.MICROSERVICE_SEARCH]:
      return {
        entities: action.payload
      }
    default:
      return state;
  }
}