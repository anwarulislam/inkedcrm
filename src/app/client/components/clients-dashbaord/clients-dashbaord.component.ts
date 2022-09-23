import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
    'id',
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
    private sidenavService: SideNavService
  ) {
    const users: any = [
      {
        id: '001',
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        instagram: 'string',
        facebook: 'string',
        dateCreated: 'string',
      },
      {
        id: '001',
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        instagram: 'string',
        facebook: 'string',
        dateCreated: 'string',
      },
      {
        id: '001',
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        instagram: 'string',
        facebook: 'string',
        dateCreated: 'string',
      },
      {
        id: '001',
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        instagram: 'string',
        facebook: 'string',
        dateCreated: 'string',
      },
      {
        id: '001',
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        instagram: 'string',
        facebook: 'string',
        dateCreated: 'string',
      },
      {
        id: '001',
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        instagram: 'string',
        facebook: 'string',
        dateCreated: 'string',
      },
      {
        id: '001',
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        instagram: 'string',
        facebook: 'string',
        dateCreated: 'string',
      },
      {
        id: '001',
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        instagram: 'string',
        facebook: 'string',
        dateCreated: 'string',
      },
      {
        id: '001',
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        instagram: 'string',
        facebook: 'string',
        dateCreated: 'string',
      },
      {
        id: '001',
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        instagram: 'string',
        facebook: 'string',
        dateCreated: 'string',
      },
      {
        id: '001',
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        instagram: 'string',
        facebook: 'string',
        dateCreated: 'string',
      },
      {
        id: '001',
        firstName: 'string',
        lastName: 'string',
        tel: 'number',
        email: 'string',
        instagram: 'string',
        facebook: 'string',
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
}
