import { Component } from '@angular/core';

@Component({
  selector: 'app-monthly-chart',
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.scss'],
})
export class MonthlyChartComponent {
  single: any[] = [
    {
      name: 'Jan',
      value: 847,
    },
    {
      name: 'Feb',
      value: 1024,
    },
    {
      name: 'Mar',
      value: 758,
    },
    {
      name: 'Apr',
      value: 930,
    },
    {
      name: 'May',
      value: 234,
    },
    {
      name: 'Jun',
      value: 123,
    },
    {
      name: 'Jul',
      value: 456,
    },
    {
      name: 'Aug',
      value: 789,
    },
    {
      name: 'Sep',
      value: 123,
    },
    {
      name: 'Oct',
      value: 456,
    },
    {
      name: 'Nov',
      value: 789,
    },
    {
      name: 'Dec',
      value: 123,
    },
  ];
  multi: any[];

  view: any = [700, 400];

  // options
  showXAxis = false;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';

  colorScheme: any = {
    domain: this.getIndexOfTop3(),
    name: ['#fff'],
  };

  getIndexOfTop3() {
    // fill an array with "#ddd" for 12 months
    let colorArray = [];
    colorArray.length = 12;
    colorArray.fill('#737373');

    // get the top index of the highest values from the single array
    let top3 = this.single
      .map((item) => item.value)
      .sort((a, b) => b - a)
      .slice(0, 3);

    // get the index of the top 3 values
    let top3Index = this.single
      .map((item) => item.value)
      .map((item, index) => (top3.includes(item) ? index : null))
      .filter((item) => item !== null);

    // fill the color array with the top 3 colors
    top3Index.forEach((item) => (colorArray[item] = '#78EF30'));

    return colorArray;
  }

  constructor() {
    // Object.assign(this, { single });
  }

  onSelect(event) {
    console.log(event);
  }
}
