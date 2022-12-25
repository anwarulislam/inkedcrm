import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';

// material imports
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

// pages
import { DashboardComponent } from './dashboard.component';

// scheduler imports to be made its own module

// events service
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EventsService } from 'src/app/core/services/events.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ClientReportsComponent } from './client-reports/client-reports.component';
import { MonthlyChartComponent } from './monthly-chart/monthly-chart.component';
import { OrderReportsComponent } from './order-reports/order-reports.component';

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

    DashboardRoutingModule,
  ],
  providers: [EventsService],
})
export class DashboardModule {}
