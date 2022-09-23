import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientsDashbaordComponent } from './components/clients-dashbaord/clients-dashbaord.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ClientComponent, ClientsDashbaordComponent],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
})
export class ClientModule {}
