import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CreateScheduleComponent } from './components/create-schedule/create-schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';

import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [ScheduleComponent, CreateScheduleComponent],
  imports: [
    SharedModule, //schedule imports
    FullCalendarModule,
    ScheduleRoutingModule,
  ],
})
export class ScheduleModule {}
