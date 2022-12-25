import { Component, OnInit } from '@angular/core';
import { GenericApiCallingService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/services/common.service';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { SnackToastrService } from 'src/app/core/services/snackToastr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  events: any = [];
  cancelledEvent = 0;
  totalClients = 0;
  totalTatoos = 0;
  clients: any = [];

  constructor(
    private sidenavService: SideNavService,
    private _toastr: SnackToastrService,
    private _authService: AuthService,
    private _apiService: GenericApiCallingService,
    public common: CommonService
  ) {
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
        this.totalClients = this.clients.length;
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
}
