import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientComponent } from './client.component';
import { ManageClientComponent } from './manage-client/manage-client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
  },
  {
    path: 'view/:id',
    component: ClientDetailComponent,
  },
  {
    path: 'add',
    data: {
      type: 'add',
    },
    component: ManageClientComponent,
  },
  {
    path: 'edit/:id',
    data: {
      type: 'edit',
    },
    component: ManageClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
