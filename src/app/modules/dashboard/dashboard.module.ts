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
import { DashboardComponent } from './dashboard.component';

// scheduler imports to be made its own module

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

// events service
import { EventsService } from 'src/app/core/services/events.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MonthlyChartComponent } from './monthly-chart/monthly-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OrderReportsComponent } from './order-reports/order-reports.component';
import { ClientReportsComponent } from './client-reports/client-reports.component';
import { ArtistListComponent } from './artist-list/artist-list.component';

// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   interactionPlugin,
//   listPlugin,
//   timeGridPlugin,
// ]);

// @ts-ignore
@NgModule({
  declarations: [
    DashboardComponent,
    MonthlyChartComponent,
    OrderReportsComponent,
    ClientReportsComponent,
    ArtistListComponent,
  ],
  imports: [
    SharedModule,
    HttpClientModule,

    NgxChartsModule,
    NgApexchartsModule,

    // material imports
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,

    //schedule imports
    FullCalendarModule,

    DashboardRoutingModule,
  ],
  providers: [EventsService],
})
export class DashboardModule {}
