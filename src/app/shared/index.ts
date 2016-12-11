import { SearchComponent } from './search/search.component';
import { ButtonComponent } from './button/button.component';
import { MenuComponent } from './menu/menu.component';

import { Headers } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


export const COMPONENTS = [
  MenuComponent,
  ButtonComponent,
  SearchComponent,
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }