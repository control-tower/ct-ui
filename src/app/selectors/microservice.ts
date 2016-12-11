import { IMicroservice } from './../models/microservice';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { State } from '../reducers';
import { State as MicroserviceState } from '../reducers/microservice';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MicroserviceSelector {

  constructor(private store: Store<State>){}

  getMicroservices(): Observable<IMicroservice[]> {
    return this.store.select( state => state.microservice.entities);
  }

}