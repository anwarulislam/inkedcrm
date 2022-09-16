import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// page components

import { WrapperComponent } from "./wrapper/wrapper.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import {ArtistsComponent} from "./artists/artists.component";
import {ClientsComponent} from "./clients/clients.component";
import {MarketingComponent} from "./marketing/marketing.component";
import {TemplatesComponent} from "./templates/templates.component";
import {DashboardComponent} from "./dashboard/dashboard.component";


const routes: Routes = [
  {
    path:'',
    component: WrapperComponent,
    children: [
      {
        path: 'schedule',
        component: ScheduleComponent
      },
      {
        path: 'artists',
        component: ArtistsComponent
      },
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'marketing',
        component: MarketingComponent
      },
      {
        path: 'templates',
        component: TemplatesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
