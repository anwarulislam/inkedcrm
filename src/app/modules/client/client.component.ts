import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { AppointmentsComponent } from '@modules/artists/components/appointments/appointments.component';
import { Customer } from 'src/app/core/interface/customer';
import { GenericApiCallingService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { SnackToastrService } from 'src/app/core/services/snackToastr.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  clientDetail: any;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'telNumber',
    'action',
  ];
  users: any = [];
  dataSource: MatTableDataSource<Customer>;

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
    this.getCustomers();
    this.sidenavService.$dynamicForm.subscribe((res) => {
      if (res == 'close') {
        this.getCustomers();
      }
    });
  }

  getCustomers() {
    this._apiService.GetData('customer', 'allCustomers', '').subscribe(
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

  addClient(edit: any, data: any) {
    const params = {
      edit: edit,
      data: data,
      type: 'Client',
    };
    this.sidenavService.$dynamicForm.next(params);
  }

  viewClientDetail(clientDetail: any) {
    this.clientDetail = clientDetail;
  }

  deleteClientDetail(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Client Detail has been deleted.', 'success');
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled', 'Client Detail is safe :)', 'error');
      }
    });
  }

  openDialog(client: any): void {
    this._apiService.GetData('event', 'allEvents', '').subscribe(
      (res: any) => {
        let events: any = [];
        for (const event of res.result) {
          if (event.customerID == client.customerID) {
            events.push(event);
          }
        }

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
          this._authService.logout();
          this._toastr.warning('Please login again');
          this._authService.logout();
        } else {
          this._toastr.error('Connection Problem');
        }
      }
    );
  }
}
