import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentsComponent } from 'src/app/artists/components/appointments/appointments.component';
import { Customer } from 'src/app/core/interface/customer';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients-dashbaord',
  templateUrl: './clients-dashbaord.component.html',
  styleUrls: ['./clients-dashbaord.component.scss'],
})
export class ClientsDashbaordComponent implements OnInit {
  clientDetail: any;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'tel',
    'action',
  ];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    public _dialog: MatDialog,
    private sidenavService: SideNavService
  ) {
    const users: any = [
      {
        firstName: 'david',
        lastName: 'donegan',
        tel: '0833097183',
        email: 'daviddonegan@gmail.com',
        dateCreated: 'string',
      },
      {
        firstName: 'francis',
        lastName: 'greene',
        tel: '088768443',
        email: 'francis@gmail.com',
        dateCreated: 'string',
      },
      {
        firstName: 'zen',
        lastName: 'donegan',
        tel: 'number',
        email: 'zendonegan@gmail.com',
        dateCreated: 'string',
      },
      {
        firstName: 'john',
        lastName: 'murphy',
        tel: '07773982485',
        email: 'john@gmail.com',
        dateCreated: 'string',
      },
      {
        firstName: 'michael',
        lastName: 'murphy',
        tel: 'number',
        email: 'string',
        dateCreated: 'string',
      },
      {
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        dateCreated: 'string',
      },
      {
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        dateCreated: 'string',
      },
      {
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        dateCreated: 'string',
      },
      {
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        dateCreated: 'string',
      },
      {
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        dateCreated: 'string',
      },
      {
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        dateCreated: 'string',
      },
      {
        firstName: 'francis',
        lastName: 'greene',
        tel: 'number',
        email: 'francisgreene@gmail.com',
        dateCreated: 'string',
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
