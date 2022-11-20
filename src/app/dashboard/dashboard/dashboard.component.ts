import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/interface/user';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import * as Highcharts from 'highcharts';
import { AppointmentsComponent } from 'src/app/artists/components/appointments/appointments.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'Artist',
    'Started',
    'Hours',
    'No tat',
    'Earned',
    'View',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  showCharts:any=true;
  highcharts = Highcharts;

  monthlyOrders:any = {   
     chart: {
        type: "bar"
     },
     title: {
        text: "Monthly Orders Report"
     },
     subtitle: {
        text: "Monthly Orders"
     },
     xAxis:{
        categories:["1st Month", "2nd Month", "3rd Month"]
     },
     yAxis: {          
        title:{
           text:"Orders"
        } 
     },
     tooltip: {
        valueSuffix:"$"
     },
     series: [
        {
          name: '1st Month',
          data: [12,25,67,234,2342,32]
        },
        {
           name: '2nd Month',
           data: [120,800,900,300,2000,1000]
        },
        {
          name: '3rd Month',
          data: [1,50,150,304,450,800]
        }
     ]
  };

  todayOrders:any = {   
    chart: {
       type: "line"
    },
    title: {
       text: "Today's Orders Report"
    },
    subtitle: {
       text: "Today's Orders"
    },
    xAxis:{
       categories:['12Am','1AM','2Am','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12PM',
       '1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM']
    },
    yAxis: {          
       title:{
          text:"Orders"
       } 
    },
    tooltip: {
       valueSuffix:"$"
    },
    series: [
      {
        name:'12AM',
        data:[45,54,98,64,23,345,656]
      },
      {
        name:'1AM',
        data:[45,345,303,864,34,345,656]
      },
      {
        name:'2AM',
        data:[45,684,603,678,2345,345,656]
      },
      {
        name:'3AM',
        data:[45,345,321,123,2345,345,656]
      },
      {
        name:'4AM',
        data:[45,345,321,56,2345,345,656]
      },
      {
        name:'5AM',
        data:[45,345,200,76,987,345,656]
      },
      {
        name:'6AM',
        data:[45,345,200,234,567,345,656]
      },
      {
        name:'7AM',
        data:[45,345,52,42,56,345,656]
      },
      {
        name:'8AM',
        data:[45,345,56,234,2345,345,656]
      },
      {
        name:'9AM',
        data:[45,345,200,74,2345,345,656]
      },
      {
        name:'10AM',
        data:[45,345,200,234,645,345,656]
      },
      {
        name:'11AM',
        data:[45,345,200,234,98,345,656]
      },
      {
        name:'12PM',
        data:[45,345,200,234,78,345,656]
      },
      {
        name:'1PM',
        data:[45,345,200,234,654,345,656]
      },
      {
        name:'2PM',
        data:[45,345,200,234,45,7654,656]
      },
      {
        name:'3PM',
        data:[45,345,200,245,34,945,656]
      },
      {
        name:'4PM',
        data:[45,345,200,234,2345,945,656]
      },
      {
        name:'5PM',
        data:[45,345,200,234,2345,563,656]
      },
      {
        name:'6PM',
        data:[45,345,200,234,2345,975,656]
      },
      {
        name:'7PM',
        data:[45,345,200,234,2345,234,656]
      },
      {
        name:'8PM',
        data:[45,345,200,234,2345,65,656]
      },
      {
        name:'9PM',
        data:[45,345,200,234,2345,34,656]
      },
      {
        name:'10PM',
        data:[45,345,200,234,2345,345,303]
      },
      {
        name:'11PM',
        data:[45,345,200,234,2345,345,43,654]
      },
    ]
  };

  donutChartData:any = [
    {
      label: '',
      value: 5,
      color: 'red',
    },
    {
      label: '	',
      value: 13,
      color: 'black',
    },
    {
      label: '',
      value: 5,
      color: 'blue',
    },
  ];

  lineOption: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };

    pieOptioon: any = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in May, 2020'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 70.67,
            sliced: true,
            selected: true
        }, {
            name: 'Edge',
            y: 14.77
        },  {
            name: 'Firefox',
            y: 4.86
        }, {
            name: 'Safari',
            y: 2.63
        }, {
            name: 'Internet Explorer',
            y: 1.53
        },  {
            name: 'Opera',
            y: 1.40
        }, {
            name: 'Sogou Explorer',
            y: 0.84
        }, {
            name: 'QQ',
            y: 0.51
        }, {
            name: 'Other',
            y: 2.6
        }]
    }]
  };
  
  constructor(private sidenavService: SideNavService,public _dialog: MatDialog) {
    const users: any = [
      {
        artist: 'joe',
        started:'16 10 2022',
        hours: '455',
        no_tat: '342',
        earned: '$3400',
      },
      {
        artist: 'joe',
        started:'16 10 2022',
        hours: '455',
        no_tat: '342',
        earned: '$3400',
      },
      {
        artist: 'joe',
        started:'16 10 2022',
        hours: '455',
        no_tat: '342',
        earned: '$3400',
      },
      {
        artist: 'joe',
        started:'16 10 2022',
        hours: '455',
        no_tat: '342',
        earned: '$3400',
      },
      {
        artist: 'joe',
        started:'16 10 2022',
        hours: '455',
        no_tat: '342',
        earned: '$3400',
      },
    ];
    this.dataSource = new MatTableDataSource(users);
  
  }

  ngOnInit(): void {
    this.sidenavService.$dynamicForm.subscribe((res) => {
      if (res == 'close') {
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  view(){

  }

  openDialog(artist:any): void {
    const dialogRef = this._dialog.open(AppointmentsComponent, {
      width: '650px',
      height:'700px',
      panelClass:'white-background-dialog',
      data: {artist:artist},
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }



}
