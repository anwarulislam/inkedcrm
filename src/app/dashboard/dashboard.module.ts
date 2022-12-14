import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardRoutingModule } from './dashboard-routing.module';

// material imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

// pages
import { WrapperComponent } from './wrapper/wrapper.component';
import { MarketingComponent } from './marketing/marketing.component';
import { TemplatesComponent } from './templates/templates.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// scheduler imports to be made its own module

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

// events service
import { EventsService } from '../core/services/events.service';
import { SharedModule } from '../shared/shared.module';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  listPlugin,
  timeGridPlugin,
]);

// @ts-ignore
@NgModule({
  declarations: [
    WrapperComponent,
    MarketingComponent,
    TemplatesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    DashboardRoutingModule,

    // material imports
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,

    //schedule imports
    FullCalendarModule,

    //shared Module
    SharedModule,
  ],
  providers: [EventsService],
})
export class DashboardModule {}
