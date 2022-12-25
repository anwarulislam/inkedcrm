import { Component, ViewChild } from '@angular/core';
import { ApexLegend, ChartComponent } from 'ng-apexcharts';

import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
};
@Component({
  selector: 'app-client-reports',
  templateUrl: './client-reports.component.html',
  styleUrls: ['./client-reports.component.scss'],
})
export class ClientReportsComponent {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13],
      chart: {
        type: 'donut',
      },
      colors: ['#ffffff', '#ffffff', '#ffffff'],
      labels: ['Data A', 'Data B', 'Data C'],
      legend: {
        show: false,
      },
    };
  }
}
