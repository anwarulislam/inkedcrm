import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './artists.component';
import { ArtistDashboardComponent } from './components/artist-dashboard/artist-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistsComponent,
    children: [
      {
        path: 'artists-dashboard',
        component: ArtistDashboardComponent,
      },
      {
        path: '',
        redirectTo: 'artists-dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistsRoutingModule {}
