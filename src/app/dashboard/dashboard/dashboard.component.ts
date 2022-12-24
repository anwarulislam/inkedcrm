import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { User } from 'src/app/core/interface/user';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { AppointmentsComponent } from 'src/app/artists/components/appointments/appointments.component';
import { GenericApiCallingService } from 'src/app/core/services/api.service';
import { SnackToastrService } from 'src/app/core/services/snackToastr.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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

  showCharts: any = true;

  monthlyOrders: any = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Monthly Orders Report',
    },
    subtitle: {
      text: 'Monthly Orders',
    },
    xAxis: {
      categories: ['1st Month', '2nd Month', '3rd Month'],
    },
    yAxis: {
      title: {
        text: 'Orders',
      },
    },
    tooltip: {
      valueSuffix: '$',
    },
    series: [
      {
        name: '1st Month',
        data: [12, 25, 67, 234, 2342, 32],
      },
      {
        name: '2nd Month',
        data: [120, 800, 900, 300, 2000, 1000],
      },
      {
        name: '3rd Month',
        data: [1, 50, 150, 304, 450, 800],
      },
    ],
  };

  todayOrders: any = {
    chart: {
      type: 'line',
    },
    title: {
      text: "Today's Orders Report",
    },
    subtitle: {
      text: "Today's Orders",
    },
    xAxis: {
      categories: [
        '12Am',
        '1AM',
        '2Am',
        '3AM',
        '4AM',
        '5AM',
        '6AM',
        '7AM',
        '8AM',
        '9AM',
        '10AM',
        '11AM',
        '12PM',
        '1PM',
        '2PM',
        '3PM',
        '4PM',
        '5PM',
        '6PM',
        '7PM',
        '8PM',
        '9PM',
        '10PM',
        '11PM',
      ],
    },
    yAxis: {
      title: {
        text: 'Orders',
      },
    },
    tooltip: {
      valueSuffix: '$',
    },
    series: [
      {
        name: '12AM',
        data: [45, 54, 98, 64, 23, 345, 656],
      },
      {
        name: '1AM',
        data: [45, 345, 303, 864, 34, 345, 656],
      },
      {
        name: '2AM',
        data: [45, 684, 603, 678, 2345, 345, 656],
      },
      {
        name: '3AM',
        data: [45, 345, 321, 123, 2345, 345, 656],
      },
      {
        name: '4AM',
        data: [45, 345, 321, 56, 2345, 345, 656],
      },
      {
        name: '5AM',
        data: [45, 345, 200, 76, 987, 345, 656],
      },
      {
        name: '6AM',
        data: [45, 345, 200, 234, 567, 345, 656],
      },
      {
        name: '7AM',
        data: [45, 345, 52, 42, 56, 345, 656],
      },
      {
        name: '8AM',
        data: [45, 345, 56, 234, 2345, 345, 656],
      },
      {
        name: '9AM',
        data: [45, 345, 200, 74, 2345, 345, 656],
      },
      {
        name: '10AM',
        data: [45, 345, 200, 234, 645, 345, 656],
      },
      {
        name: '11AM',
        data: [45, 345, 200, 234, 98, 345, 656],
      },
      {
        name: '12PM',
        data: [45, 345, 200, 234, 78, 345, 656],
      },
      {
        name: '1PM',
        data: [45, 345, 200, 234, 654, 345, 656],
      },
      {
        name: '2PM',
        data: [45, 345, 200, 234, 45, 7654, 656],
      },
      {
        name: '3PM',
        data: [45, 345, 200, 245, 34, 945, 656],
      },
      {
        name: '4PM',
        data: [45, 345, 200, 234, 2345, 945, 656],
      },
      {
        name: '5PM',
        data: [45, 345, 200, 234, 2345, 563, 656],
      },
      {
        name: '6PM',
        data: [45, 345, 200, 234, 2345, 975, 656],
      },
      {
        name: '7PM',
        data: [45, 345, 200, 234, 2345, 234, 656],
      },
      {
        name: '8PM',
        data: [45, 345, 200, 234, 2345, 65, 656],
      },
      {
        name: '9PM',
        data: [45, 345, 200, 234, 2345, 34, 656],
      },
      {
        name: '10PM',
        data: [45, 345, 200, 234, 2345, 345, 303],
      },
      {
        name: '11PM',
        data: [45, 345, 200, 234, 2345, 345, 43, 654],
      },
    ],
  };

  // totalClients:any = [
  //   {
  //     label: 'Total Clients',
  //     value: 100,
  //     color: 'red',
  //   },
  //   {
  //     label: '',
  //     value: 100,
  //     color: 'red',
  //   }
  // ];

  pieOptioon: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Browser market shares in May, 2020',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: [
          {
            name: 'Chrome',
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: 'Edge',
            y: 14.77,
          },
          {
            name: 'Firefox',
            y: 4.86,
          },
          {
            name: 'Safari',
            y: 2.63,
          },
          {
            name: 'Internet Explorer',
            y: 1.53,
          },
          {
            name: 'Opera',
            y: 1.4,
          },
          {
            name: 'Sogou Explorer',
            y: 0.84,
          },
          {
            name: 'QQ',
            y: 0.51,
          },
          {
            name: 'Other',
            y: 2.6,
          },
        ],
      },
    ],
  };

  users: any = [];
  events: any = [];
  cancelledEvent: any = 0;
  totalClients: any = [];
  totalTatoos: any = 0;
  clients: any = [];

  constructor(
    private sidenavService: SideNavService,
    private _dialog: MatDialog,
    private _toastr: SnackToastrService,
    private _authService: AuthService,
    private _apiService: GenericApiCallingService
  ) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.getArtists();
    this.sidenavService.$dynamicForm.subscribe((res) => {
      if (res == 'close') {
        this.getArtists();
      }
    });
  }

  getEvents() {
    this._apiService.GetData('event', 'allEvents', '').subscribe(
      (res: any) => {
        this.events = res.result;
        for (const event of this.events) {
          if (event.cancelled == 'N') {
            this.totalTatoos += 1;
          } else {
            this.cancelledEvent += 1;
          }
        }
        this.getCustomers();
      },
      (err) => {
        if (err.status == 403) {
          this._authService.logout();
          this._toastr.warning('Please login again');
          this._authService.logout();
        } else {
          this._toastr.error('Connection Problem');
        }
      }
    );
  }

  getCustomers() {
    this._apiService.GetData('customer', 'allCustomers', '').subscribe(
      (res: any) => {
        this.clients = res.result;
        this.calculateArtistHoursAndEarning();
      },
      (err) => {
        if (err.status == 403) {
          this._toastr.warning('Please login again');
          this._authService.logout();
        } else {
          this._toastr.error('Connection Problem');
        }
      }
    );
  }

  calculateArtistHoursAndEarning() {
    for (const user of this.users) {
      for (const event of this.events) {
        if (user.artistID == event.artistID) {
          let startDate = new Date(
            `${event.startDateStr.split('/')[2]}-${
              event.startDateStr.split('/')[1]
            }-${event.startDateStr.split('/')[0]}T${event.startTime}:00`
          );
          let endDate = new Date(
            `${event.endDateStr.split('/')[2]}-${
              event.endDateStr.split('/')[1]
            }-${event.endDateStr.split('/')[0]}T${event.endTime}:00`
          );
          user.hours = user.hours + this.diff_hours(endDate, startDate);
          user.earned = user.earned + event.cost;
          user.no_tat += 1;
        }
      }

      this.totalClients = this.clients.length;
      this.dataSource = new MatTableDataSource(this.users);
    }
  }

  diff_hours(dt2: any, dt1: any) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  }

  getArtists() {
    this._apiService.GetData('users', 'allUsers', '').subscribe(
      (res: any) => {
        this.users = res.result;
        for (const user of this.users) {
          user.hours = 0;
          user.earned = 0;
          user.no_tat = 0;
        }
        this.getEvents();
      },
      (err) => {
        if (err.status == 403) {
          this._toastr.warning('Please login again');
          this._authService.logout();
        } else {
          this._toastr.error('Connection Problem');
        }
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  view() {}

  openDialog(artist: any): void {
    let artistEvents = [];
    for (const event of this.events) {
      if (event.artistID == artist.artistID) {
        artistEvents.push(event);
      }
    }
    const dialogRef = this._dialog.open(AppointmentsComponent, {
      width: '650px',
      height: '700px',
      panelClass: 'white-background-dialog',
      data: { events: artistEvents },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
