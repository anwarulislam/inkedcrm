import { Component, Inject, OnInit } from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from '@angular/material/legacy-dialog';
import { CreateScheduleComponent } from 'src/app/schedule/components/create-schedule/create-schedule.component';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent implements OnInit {
  startDate: any;
  endDate: any;
  hoursDiff: any = 0;
  constructor(
    public _dialogRef: MatDialogRef<AppointmentDetailsComponent>,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
    let dateStart = this.data.appointment.startDateStr.split('/');
    let dateEnd = this.data.appointment.endDateStr.split('/');
    let startDatePerfect = new Date(
      `${dateStart[2]}-${dateStart[1]}-${dateStart[0]}T${data.appointment.startTime}:00`
    );
    let endDatePerfect = new Date(
      `${dateEnd[2]}-${dateEnd[1]}-${dateEnd[0]}T${data.appointment.endTime}:00`
    );
    this.hoursDiff = this.diff_hours(endDatePerfect, startDatePerfect);
  }

  ngOnInit(): void {}

  closeDialog() {
    this._dialogRef.close();
  }

  diff_hours(dt2: any, dt1: any) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  }

  reschedule() {
    let data = {
      edit: true,
      data: {
        artistID: this.data.appointment.artistID,
        cancelled: this.data.appointment.cancelled,
        comments: this.data.appointment.comments,
        cost: this.data.appointment.cost,
        customerID: this.data.appointment.customerID,
        endTime: this.data.appointment.endTime,
        eventID: this.data.appointment.eventID,
        noShow: this.data.appointment.noShow,
        reschedule: this.data.appointment.reschedule,
        startDateStr: this.data.appointment.startDateStr,
        endDateStr: this.data.appointment.endDateStr,
        startTime: this.data.appointment.startTime,
        tattooLocation: this.data.appointment.tattooLocation,
      },
    };

    const dialogRef = this._dialog.open(CreateScheduleComponent, {
      width: '650px',
      height: '700px',
      panelClass: '',
      data: data,
    });

    dialogRef.afterClosed().subscribe((res) => {
      this._dialogRef.close();
    });
  }
}
