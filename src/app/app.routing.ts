import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DefaultComponent } from './layouts/default/default.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    // canActivate:[LoginGuard],
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'clients',
        loadChildren: () =>
          import('@modules/client/client.module').then((m) => m.ClientModule),
      },
      {
        path: 'artists',
        loadChildren: () =>
          import('@modules/artists/artists.module').then(
            (m) => m.ArtistsModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'templates',
        loadChildren: () =>
          import('@modules/templates/templates.component').then(
            (m) => m.TemplatesModule
          ),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('./schedule/schedule.module').then((m) => m.ScheduleModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
