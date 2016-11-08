import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import {
  RouterModule,
  Router,
  Routes
} from '@angular/router';
import {
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ButtonComponent } from './shared/button/button.component';
import { PluginsComponent } from './plugins/plugins.component';
import { EndpointsComponent } from './endpoints/endpoints.component';
import { MicroservicesComponent } from './microservices/microservices.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

import {
  routes as dashboardChildRoutes,
  DashboardComponent,
  DashboardComponentModule
} from './dashboard/dashboard.component';


/*
 * Services
 */
import {AUTH_PROVIDERS} from './services/auth.service';
import {LoggedInGuard} from './guards/logged-in.guard';
import { OauthRequestOptions } from './services/oauth-requestoptions.service';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, children: dashboardChildRoutes, canActivate: [LoggedInGuard] },
  { path: 'plugins', component: PluginsComponent, canActivate: [LoggedInGuard] },
  { path: 'endpoints', component: EndpointsComponent, canActivate: [LoggedInGuard] },
  { path: 'microservices', component: MicroservicesComponent, canActivate: [LoggedInGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'users', component: UsersComponent, canActivate: [LoggedInGuard] },
];




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ButtonComponent,
    PluginsComponent,
    EndpointsComponent,
    MicroservicesComponent,
    ProfileComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardComponentModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AUTH_PROVIDERS,
    LoggedInGuard,
    { provide: RequestOptions, useClass: OauthRequestOptions },
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
