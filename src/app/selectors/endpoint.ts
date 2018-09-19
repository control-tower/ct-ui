import { IEndpoint } from './../models/endpoint';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { State } from '../reducers';
import { State as EndpointState } from '../reducers/endpoint';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EndpointSelector {

  constructor(private store: Store<State>){}

  getEndpoints(): Observable<IEndpoint[]> {
    return this.store.select( state => state.endpoint.entities);
  }

}