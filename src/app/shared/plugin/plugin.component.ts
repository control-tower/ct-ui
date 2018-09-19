import { IPlugin } from './../../models/plugin';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-plugin',
  templateUrl: './plugin.component.html',
  styleUrls: ['./plugin.component.scss']
})
export class PluginComponent implements OnInit {

  @Input() plugin:IPlugin
  @Output() toggleActive = new EventEmitter();
  @Output() flushCache = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleActivePlugin(active) {
    this.toggleActive.emit(active);
  }

  flush() {
    this.flushCache.emit();
  }

  editPlugin(){
    this.edit.emit();
  }

}
