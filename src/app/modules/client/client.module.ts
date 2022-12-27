import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client.routing';
import { ManageClientComponent } from './manage-client/manage-client.component';

@NgModule({
  declarations: [ClientComponent, ManageClientComponent],
  imports: [SharedModule, ClientRoutingModule],
})
export class ClientModule {}
