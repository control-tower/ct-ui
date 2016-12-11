import { ModalComponent } from './modal/modal.component';
import { DialogComponent } from './dialog/dialog.component';
import { SelectComponent } from './select/select.component';
import { PluginComponent } from './plugin/plugin.component';
import { SearchComponent } from './search/search.component';
import { ButtonComponent } from './button/button.component';
import { MenuComponent } from './menu/menu.component';

import { Headers } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


export const COMPONENTS = [
  MenuComponent,
  ButtonComponent,
  SearchComponent,
  PluginComponent,
  SelectComponent,
  DialogComponent,
  ModalComponent,
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }