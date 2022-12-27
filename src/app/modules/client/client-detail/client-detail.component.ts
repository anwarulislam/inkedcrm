import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'telNumber'];
  users: any = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const data = [
      {
        firstName: 'Test',
        createDate: 'Lorem',
        email: 'IpsumW@fas.com',
        telNumber: '1234567890',
      },
    ];
    data.length = 5;
    data.fill(data[0], 1);
    this.dataSource = new MatTableDataSource(data);
  }
}
