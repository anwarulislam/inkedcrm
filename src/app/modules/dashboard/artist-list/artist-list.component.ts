import { Component, Input, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentsComponent } from '@modules/artists/components/appointments/appointments.component';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
})
export class ArtistListComponent {
  @Input() users: any = [];
  @Input() events: any = [];

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

  constructor(private _dialog: MatDialog, public common: CommonService) {}

  ngOnInit() {
    const data = [
      {
        firstName: 'Test',
        createDate: '2021-07-01T00:00:00.000Z',
        hours: 0,
        no_tat: 0,
        earned: 0,
      },
    ];
    data.length = 10;
    data.fill(data[0], 1);
    this.dataSource = new MatTableDataSource(data);
    this.calculateArtistHoursAndEarning();
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

      this.dataSource = new MatTableDataSource(this.users);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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

  diff_hours(dt2: any, dt1: any) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  }
}
