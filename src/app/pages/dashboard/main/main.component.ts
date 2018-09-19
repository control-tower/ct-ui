import { Subscription } from 'rxjs/Subscription';
import { DashboardSelector } from './../../../selectors/dashboard';
import { DashboardAction } from './../../../actions/dashboard';
import { IMicroservice } from './../../../models/microservice';
import { Observable } from 'rxjs/Rx';
import { EndpointSelector } from './../../../selectors/endpoint';
import { EndpointAction } from './../../../actions/endpoint';
import { MicroserviceSelector } from './../../../selectors/microservice';
import { MicroserviceAction } from './../../../actions/microservice';
import { UserSelector } from './../../../selectors/user';
import { UserAction } from './../../../actions/user';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  mainInfo: any
  mainInfoSub: Subscription

  constructor(private dashboardAction: DashboardAction, private dashboardSelector: DashboardSelector) {}

  ngOnInit() {
    this.dashboardAction.getMainInformation();
    this.mainInfoSub = this.dashboardSelector.getMainInformation().subscribe(data => this.mainInfo = data);    
  }

  ngOnDestroy() {
    this.mainInfoSub.unsubscribe();
  }

}
