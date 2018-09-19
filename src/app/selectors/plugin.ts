import { IPlugin } from './../models/plugin';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { State } from '../reducers';
import { State as PluginState } from '../reducers/plugin';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PluginSelector {

  constructor(private store: Store<State>){}

  getPlugins(): Observable<IPlugin[]> {
    return this.store.select( state => state.plugin.entities);
  }

}