import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CreateScheduleComponent } from './components/create-schedule/create-schedule.component';
import { ScheduleDashboardComponent } from './components/schedule-dashboard/schedule-dashboard.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleDashboardComponent,
    CreateScheduleComponent,
  ],
  imports: [SharedModule, ScheduleRoutingModule],
})
export class ScheduleModule {}
