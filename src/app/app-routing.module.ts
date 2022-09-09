import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule} from "./dashboard/dashboard.module";
import {DashboardRoutingModule} from "./dashboard/dashboard-routing.module";


const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path:'**',
    redirectTo:'/schedule',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    DashboardModule,
    DashboardRoutingModule,
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }


