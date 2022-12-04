import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxDonutChartModule } from 'ngx-doughnut-chart';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { OwlModule } from 'ngx-owl-carousel';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    LayoutModule,
    RouterModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatCheckboxModule,
    FullCalendarModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    HighchartsChartModule,
    NgxDonutChartModule,

    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OwlModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OwlModule,

    
    RouterModule,
    SidenavComponent,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatCardModule,
    FullCalendarModule,
    HttpClientModule,
    TranslateModule,
    HighchartsChartModule,
    NgxDonutChartModule
  ],
})
export class SharedModule {}
