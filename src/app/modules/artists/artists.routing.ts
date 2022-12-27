import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './artists.component';
import { ManageArtistComponent } from './manage-artist/manage-artist.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistsComponent,
  },
  {
    path: 'add',
    data: {
      type: 'add',
    },
    component: ManageArtistComponent,
  },
  {
    path: 'edit/:id',
    data: {
      type: 'edit',
    },
    component: ManageArtistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistsRoutingModule {}
