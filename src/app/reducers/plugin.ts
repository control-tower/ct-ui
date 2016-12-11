import { IPlugin } from './../models/plugin';
import * as plugin from '../actions/plugin';


export interface State {
  entities: IPlugin[]
};

const initialState: State = {
  entities: []
};

export function reducer(state = initialState, action: plugin.Actions): State {
  switch (action.type) {
    case plugin.PluginActions[plugin.PluginActions.PLUGIN_SEARCH]:
      return {
        entities: action.payload
      }
    default:
      return state;
  }
}