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
import { CommonService } from 'src/app/core/services/common.service';

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
    private _apiService: GenericApiCallingService,
    public common: CommonService
  ) {
    this.dataSource = new MatTableDataSource(this.users);
    this.common.page.next('Dashboard');
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
