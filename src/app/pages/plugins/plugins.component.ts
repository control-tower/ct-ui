import { IPlugin } from './../../models/plugin';
import { Observable } from 'rxjs/Observable';
import { PluginSelector } from './../../selectors/plugin';
import { PluginAction } from './../../actions/plugin';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss']
})
export class PluginsComponent implements OnInit {

  @ViewChild('dialogToggle') dialogToggle
  @ViewChild('dialogFlush') dialogFlush
  @ViewChild('editModal') editModal
  @ViewChild('jsonEditor') jsonEditor
  plugins$: Observable<IPlugin[]>

  targetPlugin: IPlugin = null;
  targetActive: boolean = false;
  config: any = {}

  constructor(private pluginAction: PluginAction, private pluginSelector: PluginSelector) { }

  ngOnInit() {
    this.pluginAction.searchPlugins();
    this.plugins$ = this.pluginSelector.getPlugins();
  }

  toggleActive(plugin, active){
    this.targetPlugin = plugin;
    this.targetActive = active;
    this.dialogToggle.open();
  }

  flushCache($event) {
    this.dialogFlush.open();
  }

  closeToggleDialog(){
    this.pluginAction.updatePlugin(this.targetPlugin._id, {active: this.targetActive});
  }

  closeFlushDialog(){
    this.pluginAction.flushCache();
  }

  edit(plugin) {
    this.targetPlugin = plugin;
    this.config = this.targetPlugin.config || {};
    this.editModal.open();
  }

  saveEdit(){
    const newConfig = this.jsonEditor.nativeElement.get();
    this.pluginAction.updatePlugin(this.targetPlugin._id, {config: newConfig, active: this.targetPlugin.active});
  }


}
