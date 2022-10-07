import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { ScheduleDashboardComponent } from './components/schedule-dashboard/schedule-dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ScheduleComponent, ScheduleDashboardComponent],
  imports: [CommonModule, ScheduleRoutingModule, SharedModule],
})
export class ScheduleModule {}