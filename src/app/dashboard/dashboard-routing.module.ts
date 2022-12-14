import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// page components

import { WrapperComponent } from './wrapper/wrapper.component';
import { MarketingComponent } from './marketing/marketing.component';
import { TemplatesComponent } from './templates/templates.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'marketing',
        component: MarketingComponent,
      },
      {
        path: 'templates',
        component: TemplatesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
