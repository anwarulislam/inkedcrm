import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client.routing';

@NgModule({
  declarations: [ClientComponent],
  imports: [SharedModule, ClientRoutingModule],
})
export class ClientModule {}
