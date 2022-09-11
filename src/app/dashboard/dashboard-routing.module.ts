import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// page components

import { WrapperComponent } from "./wrapper/wrapper.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import {ArtistsComponent} from "./artists/artists.component";
import {ClientsComponent} from "./clients/clients.component";
import {EnquiriesComponent} from "./enquiries/enquiries.component";
import {ReportsComponent} from "./reports/reports.component";
import {MarketingComponent} from "./marketing/marketing.component";


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
        path: 'enquiries',
        component: EnquiriesComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'marketing',
        component: MarketingComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
