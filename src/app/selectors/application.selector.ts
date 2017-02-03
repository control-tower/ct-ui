import { IApplication } from './../models/application.model';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { State } from '../reducers';
import { State as ApplicationState } from '../reducers/application.reducer';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApplicationSelector {

  constructor(private store: Store<State>){}

  getApplications(): Observable<IApplication[]> {
    return this.store.select( state => state.application.entities);
  }

  getApplicationDetail(): Observable<IApplication> {
    return this.store.select( state => state.application.detail);
  }

}
