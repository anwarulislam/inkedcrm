import { Component, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-order-reports',
  templateUrl: './order-reports.component.html',
  styleUrls: ['./order-reports.component.scss'],
})
export class OrderReportsComponent {
  @ViewChild('chart') chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'New Customers',
          data: [31, 40, 28, 51, 42, 109, 100],
          color: '#79ef31',
        },
        {
          name: 'Re Customers',
          data: [11, 32, 45, 32, 34, 52, 41],
          color: '#333333',
        },
      ],
      chart: {
        foreColor: '#ddd',
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        colors: ['#79ef31', '#333'],
      },
      xaxis: {
        type: 'category',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
    };
  }

  public generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}
