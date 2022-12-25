import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// page components

import { DashboardComponent } from './dashboard.component';
import { MarketingComponent } from '../marketing/marketing.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'marketing',
    component: MarketingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
