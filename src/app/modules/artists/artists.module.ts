import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistsComponent } from './artists.component';
import { ArtistDashboardComponent } from './components/artist-dashboard/artist-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';

@NgModule({
  declarations: [
    ArtistsComponent,
    ArtistDashboardComponent,
    AppointmentsComponent,
    AppointmentDetailsComponent,
  ],
  imports: [CommonModule, ArtistsRoutingModule, SharedModule],
})
export class ArtistsModule {}
