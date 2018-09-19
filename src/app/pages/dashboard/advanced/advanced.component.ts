import { Subscription } from 'rxjs/Subscription';
import { DashboardSelector } from './../../../selectors/dashboard';
import { DashboardAction } from './../../../actions/dashboard';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit, OnDestroy {

  dashboardSub: Subscription
  advancedInfo: any
  from: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() - 7}
  to: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()}

  constructor(private dashboardAction: DashboardAction, private dashboardSelector: DashboardSelector) { }

  ngOnInit() {
    this.dashboardSub = this.dashboardSelector.getAdvancedInformation().do(x => console.log(x)).subscribe(data => this.advancedInfo = data);
    this.filter();
  }

  ngOnDestroy() {
    this.dashboardSub.unsubscribe();
  }

  filter(){
    
    this.dashboardAction.getAdvancedInformation(this.from , this.to);
  }

}
