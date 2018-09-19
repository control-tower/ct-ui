import { IMicroservice } from './../../models/microservice';
import { Observable } from 'rxjs/Rx';
import { MicroserviceSelector } from './../../selectors/microservice';
import { MicroserviceAction } from './../../actions/microservice';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-microservices',
  templateUrl: './microservices.component.html',
  styleUrls: ['./microservices.component.scss'],
})
export class MicroservicesComponent implements OnInit, OnDestroy {
  @ViewChild('mydatatable') table;
  microservices: IMicroservice[]
  microservicesFilter: IMicroservice[]
  microserviceSub: Subscription
  filterText: string = ''

  private searchMicroserviceStream = new Subject<string>()

  constructor(private microserviceAction: MicroserviceAction, private microserviceSelector: MicroserviceSelector) { }

  ngOnInit() {
    this.microserviceAction.searchMicroservices();
    this.microserviceSub = this.microserviceSelector.getMicroservices().map((data) => data.map((el) => Object.assign({}, el))).subscribe((data) => {
      this.microservices = data;
      this.filter(this.filterText);
    });

    this.searchMicroserviceStream
      .debounceTime(300)
      .distinctUntilChanged()  
      .map(term => this.filterText = term)    
      .subscribe(term => this.filter(term));
  }

  private filter(term){
    this.microservicesFilter = this.microservices.filter(d => {
      return d.name.indexOf(term) >= 0;
    });
  }

  refresh(){
    this.microserviceAction.searchMicroservices();
  }

  updateFilter(term) {
    this.searchMicroserviceStream.next(term);
  }

  ngOnDestroy() {
    this.microserviceSub.unsubscribe();
  }

  toggleExpandRow(e, row) {
    e.preventDefault();
    this.table.toggleExpandRow(row);
  }

}
