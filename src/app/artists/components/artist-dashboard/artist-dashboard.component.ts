import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/interface/user';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-artist-dashboard',
  templateUrl: './artist-dashboard.component.html',
  styleUrls: ['./artist-dashboard.component.scss'],
})
export class ArtistDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'username',
    'firstName',
    'lastName',
    'email',
    'action',
  ];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sidenavService: SideNavService) {
    const users: any = [
      {
        firstName: 'joe',
        lastName: 'murphy',
        username: 'string',
        email: 'string',
        role: 'string',
      },
      {
        firstName: 'michael',
        lastName: 'donegan',
        username: 'string',
        email: 'string',
        role: 'string',
      },
      {
        firstName: 'francis',
        lastName: 'greene',
        username: 'string',
        email: 'string',
        role: 'string',
      },
      {
        firstName: 'paddy',
        lastName: 'oneil',
        username: 'string',
        email: 'string',
        role: 'string',
      },
      {
        firstName: 'darragh',
        lastName: 'oshea',
        username: 'string',
        email: 'string',
        role: 'string',
      },
      {
        firstName: 'ciaran',
        lastName: 'ward',
        username: 'string',
        email: 'string',
        role: 'string',
      },
      {
        firstName: 'cathal',
        lastName: 'murphy',
        username: 'string',
        email: 'string',
        role: 'string',
      },
      {
        firstName: 'cian',
        lastName: 'donegan',
        username: 'string',
        email: 'string',
        role: 'string',
      },
      {
        firstName: 'ciara',
        lastName: 'oshea',
        username: 'string',
        email: 'string',
        role: 'string',
      },
      {
        firstName: 'sara',
        lastName: 'connor',
        username: 'string',
        email: 'string',
        role: 'string',
      },
      {
        firstName: 'john',
        lastName: 'donegan',
        username: 'string',
        email: 'string',
        role: 'string',
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
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Artist Detail has been deleted.', 'success');
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled', 'Artist Detail is safe :)', 'error');
      }
    });
  }
}
