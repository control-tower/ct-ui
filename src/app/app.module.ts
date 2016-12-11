import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MicroservicesComponent } from './pages/microservices/microservices.component';
import { EndpointsComponent } from './pages/endpoints/endpoints.component';
import { PluginsComponent } from './pages/plugins/plugins.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Angular2DataTableModule } from 'angular2-data-table';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/Rx';

import {
  RouterModule,
  Router,
  Routes
} from '@angular/router';
import {
  LocationStrategy,
  PathLocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF
} from '@angular/common';

import { AppComponent } from './app.component';
import { routes } from './routes';
import {
  DashboardComponentModule
} from './pages/dashboard/dashboard.component';
import { ComponentsModule } from './shared';



/*
 * Services
 */
import {SERVICES} from './services';
import {ACTIONS} from './actions';
import {SELECTORS} from './selectors';
import {LoggedInGuard} from './guards/logged-in.guard';
import { OauthRequestOptions } from './services/oauth-requestoptions.service';
import { reducer } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    PluginsComponent,
    EndpointsComponent,
    MicroservicesComponent,
    ProfileComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardComponentModule,
    ComponentsModule,
    Angular2DataTableModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    SimpleNotificationsModule, 
    RouterModule.forRoot(routes),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
  providers: [
    SERVICES,
    ACTIONS,
    SELECTORS,
    LoggedInGuard,
    { provide: RequestOptions, useClass: OauthRequestOptions },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
