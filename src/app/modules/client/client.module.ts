import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientsDashbaordComponent } from './components/clients-dashbaord/clients-dashbaord.component';

@NgModule({
  declarations: [ClientComponent, ClientsDashbaordComponent],
  imports: [SharedModule, ClientRoutingModule],
})
export class ClientModule {}
