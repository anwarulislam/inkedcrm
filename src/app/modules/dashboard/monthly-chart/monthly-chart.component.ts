import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  ApexXAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-monthly-chart',
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.scss'],
})
export class MonthlyChartComponent {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  data = [240, 380, 300, 400, 510, 340, 200, 600, 405, 860, 1100, 450];

  get dataColors() {
    // get top 3 values index
    const top3 = this.data
      .map((value, index) => ({ value, index }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map((item) => item.index);

    // set colors
    return this.data.map((value, index) => {
      if (top3.includes(index)) {
        return '#78EF30';
      } else {
        return '#737373';
      }
    });
  }

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Orders',
          data: this.data,
        },
      ],
      colors: this.dataColors,
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        },
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        labels: {
          style: {
            colors: '#ddd',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ddd',
            fontSize: '12px',
          },
        },
      },
    };
  }
}
