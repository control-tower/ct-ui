import { IUser } from './../models/user';
import * as user from '../actions/user';


export interface State {
  entities: IUser[]
};

const initialState: State = {
  entities: []
};

export function reducer(state = initialState, action: user.Actions): State {
  switch (action.type) {
    case user.UserActions[user.UserActions.USER_SEARCH]:
      return {
        entities: action.payload
      }
    default:
      return state;
  }
}