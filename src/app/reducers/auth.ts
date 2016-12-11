import * as auth from '../actions/auth';


export interface State {
  token: string
};

const initialState: State = {
  token: null
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.AuthActions[auth.AuthActions.AUTH_GENERATE_TOKEN]:
      return {
        token: action.payload
      }
    default:
      return state;
  }
}