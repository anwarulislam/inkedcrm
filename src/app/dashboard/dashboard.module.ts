import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from "@angular/router";
import { HttpClientModule}  from '@angular/common/http';
import { DashboardRoutingModule} from "./dashboard-routing.module";

// material imports
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatListModule} from "@angular/material/list";
import { MatIconModule} from "@angular/material/icon";
import { MatToolbarModule} from "@angular/material/toolbar";

// pages
import { ArtistsComponent } from './artists/artists.component';
import { ClientsComponent } from './clients/clients.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { ReportsComponent } from './reports/reports.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { WrapperComponent } from './wrapper/wrapper.component';


// scheduler imports to be made its own module

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';



FullCalendarModule.registerPlugins ([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    ArtistsComponent,
    ClientsComponent,
    EnquiriesComponent,
    ReportsComponent,
    ScheduleComponent,
    WrapperComponent
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
  ]
})

export class DashboardModule { }

