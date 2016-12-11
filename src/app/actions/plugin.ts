import { NotificationAction } from './notification';
import { PluginService } from './../services/plugin.service';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';


export enum PluginActions {
  PLUGIN_SEARCH,
  PLUGIN_UPDATE,
  FLUSH_CACHE
};

export class SearchAction implements Action {
  type = PluginActions[PluginActions.PLUGIN_SEARCH];
  constructor(public payload: any) { }
}

export class UpdateAction implements Action {
  type = PluginActions[PluginActions.PLUGIN_UPDATE];
  constructor(public payload: any) { }
}

export class FlushCacheAction implements Action {
  type = PluginActions[PluginActions.FLUSH_CACHE];
  constructor(public payload: any) { }
}

export type Actions = SearchAction;

@Injectable()
export class PluginAction {

  constructor(private pluginService: PluginService, private store: Store<State>, private notificationAction: NotificationAction){}

  searchPlugins(){
    this.pluginService.getPlugins().subscribe(data => {
      this.store.dispatch(new SearchAction(data));
      this.notificationAction.info('Plugins obtained successfully');
    }, () => this.notificationAction.error('Error obtaining Plugins'));
  }

  updatePlugin(id, plugin){
    this.pluginService.updatePlugin(id, plugin).subscribe(data => {
      this.searchPlugins();
      this.notificationAction.info('Plugin updated successfully');
    }, () => this.notificationAction.error('Error updating plugin'));
  }

  flushCache(){
    this.pluginService.flushCache().subscribe(data => {
      this.notificationAction.info('Flush Cache successfully');
    }, () => this.notificationAction.error('Error flushing cache'));
  }

}