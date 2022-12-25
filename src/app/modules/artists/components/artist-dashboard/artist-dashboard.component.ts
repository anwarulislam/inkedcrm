import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { User } from 'src/app/core/interface/user';
import { GenericApiCallingService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { SnackToastrService } from 'src/app/core/services/snackToastr.service';
import Swal from 'sweetalert2';
import { AppointmentsComponent } from '../appointments/appointments.component';

@Component({
  selector: 'app-artist-dashboard',
  templateUrl: './artist-dashboard.component.html',
  styleUrls: ['./artist-dashboard.component.scss'],
})
export class ArtistDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'image',
    'username',
    'firstName',
    'lastName',
    'email',
    'action',
  ];
  dataSource: MatTableDataSource<User>;
  users: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    public _dialog: MatDialog,
    private sidenavService: SideNavService,
    private _toastr: SnackToastrService,
    private _apiService: GenericApiCallingService,
    private _authService: AuthService
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

  getArtists() {
    this._apiService.GetData('users', 'allUsers', '').subscribe(
      (res: any) => {
        this.users = res.result;
        console.log(this.users);
        this.dataSource = new MatTableDataSource(this.users);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addArtist(edit: any, data: any) {
    const params = {
      edit: edit,
      data: data,
      type: 'Artist',
    };
    this.sidenavService.$dynamicForm.next(params);
  }

  deleteArtistDetail(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo this! We recommend changing their password',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your artist has been deleted.', 'success');
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled', 'Your Artist has not been deleted', 'error');
        Swal.fire('Cancelled', 'Your Artist has not been deleted', 'error');
      }
    });
  }

  openDialog(artist: any): void {
    this._apiService.GetData('event', 'allEvents', '').subscribe(
      (res: any) => {
        let events: any = [];
        res.result.forEach((event: any) => {
          if (event.artistID == artist.artistID) {
            events.push(event);
          }
        });

        const dialogRef = this._dialog.open(AppointmentsComponent, {
          width: '650px',
          height: '700px',
          panelClass: 'white-background-dialog',
          data: { events: events },
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          console.log('The dialog was closed');
          console.log(result);
        });
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
