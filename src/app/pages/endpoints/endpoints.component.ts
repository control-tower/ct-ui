import { EndpointSelector } from './../../selectors/endpoint';
import { EndpointAction } from './../../actions/endpoint';
import { Subject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { IEndpoint } from './../../models/endpoint';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.scss']
})
export class EndpointsComponent implements OnInit {

  @ViewChild('mydatatable') table;
  endpoints: IEndpoint[]
  endpointsFilter: IEndpoint[]
  endpointSub: Subscription
  filterText: string

  private searchEndpointStream = new Subject<string>()

  constructor(private endpointAction: EndpointAction, private endpointSelector: EndpointSelector) { }

  ngOnInit() {
    this.endpointAction.searchEndpoints();
    this.endpointSub = this.endpointSelector.getEndpoints().map((data) => data.map((el) => Object.assign({}, el))).subscribe((data) => {
      this.endpoints = data;
      this.filter(this.filterText);
    });

    this.searchEndpointStream
      .debounceTime(300)
      .distinctUntilChanged() 
      .map(term => this.filterText = term)  
      .subscribe(term => this.filter(term.toLowerCase()));
  }

  private filter(term){
    this.endpointsFilter = this.endpoints.filter(d => {
      return d.path.toLowerCase().indexOf(term) >= 0;
    });
  }

  refresh(){
    this.endpointAction.searchEndpoints();
  }

  updateFilter(term) {
    this.searchEndpointStream.next(term);
  }

  ngOnDestroy() {
    this.endpointSub.unsubscribe();
  }

  toggleExpandRow(e, row) {
    e.preventDefault();
    this.table.toggleExpandRow(row);
  }

}
