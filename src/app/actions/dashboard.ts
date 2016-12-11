import { NotificationAction } from './notification';
import { UserAction } from './user';
import { EndpointAction } from './endpoint';
import { MicroserviceAction } from './microservice';
import { DashboardService } from './../services/dashboard.service';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';


export enum DashboardActions {
  COUNT_REQUEST_TODAY,
  COUNT_REQUEST_LASTWEEK,
  COUNT_REQUEST_TODAY_BY_COUNTRY,
  AVG_BY_REQUEST,
  REQUEST_BY_DAY
};

export class CountRequestTodayAction implements Action {
  type = DashboardActions[DashboardActions.COUNT_REQUEST_TODAY];
  constructor(public payload: any) { }
}

export class CountRequestLastWeekAction implements Action {
  type = DashboardActions[DashboardActions.COUNT_REQUEST_LASTWEEK];
  constructor(public payload: any) { }
}

export class CountRequestTodayByCountryAction implements Action {
  type = DashboardActions[DashboardActions.COUNT_REQUEST_TODAY_BY_COUNTRY];
  constructor(public payload: any) { }
}

export class AvgByRequestAction implements Action {
  type = DashboardActions[DashboardActions.AVG_BY_REQUEST];
  constructor(public payload: any) { }
}

export class RequestByDayAction implements Action {
  type = DashboardActions[DashboardActions.REQUEST_BY_DAY];
  constructor(public payload: any) { }
}


export type Actions = CountRequestTodayAction | CountRequestLastWeekAction | CountRequestTodayByCountryAction | AvgByRequestAction | RequestByDayAction;

function orderRequestByDay(r1, r2) {
  const r1d = new Date(`${r1._id.month}-${r1._id.day}-${r1._id.year}`);
  const r2d = new Date(`${r2._id.month}-${r2._id.day}-${r2._id.year}`);
  return (<any>r1d) - (<any>r2d);
}

function orderRequestByNum(r1, r2) {
  return r2.count - r1.count;
}

function orderRequestBySum(r1, r2) {
  return r2.sum - r1.sum;
}



function formatDate(date) {
  return `${date.month}-${date.day}-${date.year}`;
}

@Injectable()
export class DashboardAction {

  constructor(private dashboardService: DashboardService, private store: Store<State>, private microserviceAction: MicroserviceAction, private endpointAction: EndpointAction, private userAction: UserAction, private notificationAction: NotificationAction){}

  countRequestToday(){
    this.dashboardService.countRequestToday().subscribe(data => {
      this.store.dispatch(new CountRequestTodayAction(data));
      this.notificationAction.info('Request of today obtained successfully');
    }, () => this.notificationAction.error('Error obtaining request of today'));
  }

  countRequestLastWeek(){
    this.dashboardService.countRequestLastWeek().subscribe(data => {
      this.store.dispatch(new CountRequestLastWeekAction(data));
      this.notificationAction.info('Request of last week obtained successfully');
    }, () => this.notificationAction.error('Error obtaining request of last week'));
  }
  countRequestTodayByCountry(){
    this.dashboardService.countRequestTodayByCountry().subscribe(data => {
      this.store.dispatch(new CountRequestTodayByCountryAction(data.sort(orderRequestByNum)));
      this.notificationAction.info('Request of today by country obtained successfully');
    }, () => this.notificationAction.error('Error obtaining request of today by country'));
  }

  avgByRequest(from, to){
    this.dashboardService.avgByRequest(from, to).subscribe(data => {
      this.store.dispatch(new AvgByRequestAction(data.sort(orderRequestBySum)));
      this.notificationAction.info('Average of request obtained successfully');
    }, () => this.notificationAction.error('Error obtaining average of request'));
  }

  requestByDay(from, to){
    this.dashboardService.requestByDay(from, to).subscribe(data => {
      this.store.dispatch(new RequestByDayAction(data.sort(orderRequestByDay)));
      this.notificationAction.info('Request by days obtained successfully');
    }, () => this.notificationAction.error('Error obtaining request by days'));
  }

  getMainInformation(){
    this.countRequestLastWeek();
    this.countRequestToday();
    this.countRequestTodayByCountry();
    this.userAction.searchUsers();
    this.microserviceAction.searchMicroservices();
    this.endpointAction.searchEndpoints();
  }

  getAdvancedInformation(fromDate, toDate){
    let from = formatDate(fromDate);
    let to = formatDate(toDate);
    this.avgByRequest(from, to);
    this.requestByDay(from, to);
  }

}