import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() placeholder = "";
  @Output() update = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  keyup(value){
    this.update.emit(value);
  }

}
