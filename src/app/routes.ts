import { Routes } from '@angular/router';
import {LoggedInGuard} from './guards/logged-in.guard';
import { PluginsComponent } from './pages/plugins/plugins.component';
import { EndpointsComponent } from './pages/endpoints/endpoints.component';
import { MicroservicesComponent } from './pages/microservices/microservices.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/users/users.component';
import { routes as applicationChildRoutes, ApplicationComponent } from './pages/applications/application.component';

import {
  routes as dashboardChildRoutes,
  DashboardComponent,
  DashboardComponentModule
} from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, children: dashboardChildRoutes, canActivate: [LoggedInGuard] },
  { path: 'plugins', component: PluginsComponent, canActivate: [LoggedInGuard] },
  { path: 'endpoints', component: EndpointsComponent, canActivate: [LoggedInGuard] },
  { path: 'microservices', component: MicroservicesComponent, canActivate: [LoggedInGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'users', component: UsersComponent, canActivate: [LoggedInGuard] },
  { path: 'applications', component: ApplicationComponent, children: applicationChildRoutes, canActivate: [LoggedInGuard] },
];
