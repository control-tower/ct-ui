import { ComponentsModule } from './../../shared/index';
import { CommonModule } from '@angular/common';
import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2DataTableModule } from 'angular2-data-table';
import { ListApplicationComponent } from './list/list-application.component';
import { DetailApplicationComponent } from './detail/detail-application.component';

@Component({
  selector: 'app-applications',
  template: `<router-outlet></router-outlet>`
})
export class ApplicationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: ListApplicationComponent },
  { path: 'detail/:slug', component: DetailApplicationComponent }
];

@NgModule({
  declarations: [
    ApplicationComponent,
    ListApplicationComponent,
    DetailApplicationComponent
  ],
  exports: [
    ApplicationComponent,
    ListApplicationComponent,
    DetailApplicationComponent
  ],
  imports: [RouterModule, CommonModule, ComponentsModule, FormsModule, ReactiveFormsModule, NgbModule, Angular2DataTableModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApplicationComponentModule { }
