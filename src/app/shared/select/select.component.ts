import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() options = []
  @Input() value = ''
  @Output() update = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeEvent(event, value){
    this.update.emit(value);
  }

}
