import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { AppointmentDetailsComponent } from '../appointment-details/appointment-details.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  iterator:any=[1,2,3,4,5,6,7,8,9,10];
  today:any = new Date();
  constructor(
    public _dialogRef: MatDialogRef<AppointmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog:MatDialog
    ){
      
    }

  ngOnInit(): void {
  }

  closeDialog(){
    this._dialogRef.close(true);
  }

  openDialog(appointment:any): void {
    this._dialogRef.close();
    
    const dialogRef = this._dialog.open(AppointmentDetailsComponent, {
      width: '650px',
      height:'600px',
      panelClass:'white-background-dialog',
      data: {appointment:appointment},
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

}
