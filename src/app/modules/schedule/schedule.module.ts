import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CreateScheduleComponent } from './components/create-schedule/create-schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import { FullCalendarModule } from '@fullcalendar/angular';

// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   interactionPlugin,
//   listPlugin,
//   timeGridPlugin,
// ]);

@NgModule({
  declarations: [ScheduleComponent, CreateScheduleComponent],
  imports: [
    SharedModule, //schedule imports
    FullCalendarModule,
    ScheduleRoutingModule,
  ],
})
export class ScheduleModule {}
