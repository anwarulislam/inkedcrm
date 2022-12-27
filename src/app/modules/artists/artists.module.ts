import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ArtistsRoutingModule } from './artists.routing';
import { ArtistsComponent } from './artists.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ManageArtistComponent } from './manage-artist/manage-artist.component';

@NgModule({
  declarations: [
    ArtistsComponent,
    AppointmentsComponent,
    AppointmentDetailsComponent,
    ManageArtistComponent,
  ],
  imports: [SharedModule, ArtistsRoutingModule],
})
export class ArtistsModule {}
