import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { State } from '../reducers';
import { State as DashboardState } from '../reducers/dashboard';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DashboardSelector {

  constructor(private store: Store<State>){}

  getAdvancedInformation(): Observable<any> {
    return this.store.select( state => {
      let avg = [["Path", "Parent", "Value"], ["Global", null, 0]];
      if (state.dashboard.avgByRequest) {
        let i = 0; 
        while (avg.length < 12 && state.dashboard.avgByRequest.length > i) {
          let el = state.dashboard.avgByRequest[i];
          avg.push([el._id.endpointPath, 'Global', el.sum]);
          i++;
        }
      }

      let days = [];
      if (state.dashboard.requestByDay) {
        days = state.dashboard.requestByDay.map(el => [`${el._id.day}/${el._id.month}/${el._id.year}`, el.count]);
      }
      return {
        avgByRequest: avg,
        requestByDay: days
      };

    });
  }

  getMainInformation(): Observable<any> {
    return this.store.select( state => {
      let countries = [];
      if (state.dashboard.countRequestTodayByCountry) {
        let i = 0;
        while (countries.length < 4 && state.dashboard.countRequestTodayByCountry.length > i) {
          if(state.dashboard.countRequestTodayByCountry[i]._id) {
            countries.push(state.dashboard.countRequestTodayByCountry[i]);
          }
          i++;
        }
      }
        return {
            users: state.user.entities.length,
            microservices: state.microservice.entities.length,
            endpoints: state.endpoint.entities.length,
            countRequestToday: state.dashboard.countRequestToday,
            countRequestLastWeek: state.dashboard.countRequestLastWeek,
            countRequestTodayByCountry: countries,
        }
    });
  }

}