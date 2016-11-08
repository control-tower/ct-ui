import { Component, OnInit, NgModule } from '@angular/core';

import { RouterModule, ActivatedRoute, Router, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdvancedComponent } from './advanced/advanced.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export const routes: Routes = [
  { path: '', redirectTo: 'main' },
  { path: 'main', component: MainComponent },
  { path: 'advanced', component: AdvancedComponent },
];

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    AdvancedComponent
  ],
  exports: [
    DashboardComponent,
    MainComponent,
    AdvancedComponent
  ],
  imports: [RouterModule]
})
export class DashboardComponentModule { }