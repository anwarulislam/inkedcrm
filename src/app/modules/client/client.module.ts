import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client.routing';
import { ManageClientComponent } from './manage-client/manage-client.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

@NgModule({
  declarations: [ClientComponent, ManageClientComponent, ClientDetailComponent],
  imports: [SharedModule, ClientRoutingModule],
})
export class ClientModule {}
