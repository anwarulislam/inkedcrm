import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistsComponent } from './artists.component';
import { ArtistDashboardComponent } from './components/artist-dashboard/artist-dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ArtistsComponent, ArtistDashboardComponent],
  imports: [CommonModule, ArtistsRoutingModule, SharedModule],
})
export class ArtistsModule {}
