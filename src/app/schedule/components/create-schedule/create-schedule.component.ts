import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from '@angular/material/legacy-dialog';
import { GenericApiCallingService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackToastrService } from 'src/app/core/services/snackToastr.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss'],
})
export class CreateScheduleComponent implements OnInit {
  form: any;
  customers: any = [];
  user: any;
  constructor(
    public _dialogRef: MatDialogRef<CreateScheduleComponent>,
    private _fb: UntypedFormBuilder,
    private _apiService: GenericApiCallingService,
    private _authService: AuthService,
    private _toastr: SnackToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = _authService.getUser();
  }

  ngOnInit(): void {
    this.buildForm();
    this.getCustomers();
  }

  buildForm() {
    if (this.data.data != null) {
      let startDate = this.data.data.startDateStr.split('/');
      startDate = new Date(`${startDate[2]}-${startDate[1]}-${startDate[0]}`);

      let endDate = this.data.data.endDateStr.split('/');
      endDate = new Date(`${endDate[2]}-${endDate[1]}-${endDate[0]}`);

      let startTime = new Date(startDate.toDateString());
      startTime.setHours(this.data.data.startTime.split(':')[0]);
      startTime.setMinutes(this.data.data.startTime.split(':')[1]);

      let endTime = new Date(endDate.toDateString());
      endTime.setHours(this.data.data.endTime.split(':')[0]);
      endTime.setMinutes(this.data.data.endTime.split(':')[1]);

      this.form = this._fb.group({
        artistID: [this.data.data.artistID, Validators.required],
        customerID: [`${this.data.data.customerID}`, Validators.required],
        startTime: [startTime, Validators.required],
        endTime: [endTime, Validators.required],
        cost: [this.data.data.cost, Validators.required],
        startDateStr: [startDate, Validators.required],
        endDateStr: [endDate, Validators.required],
        tattooLocation: [this.data.data.tattooLocation, Validators.required],
        comments: [this.data.data.comments, Validators.required],
        cancelled: [this.data.data.cancelled, Validators.required],
        noShow: [this.data.data.noShow, Validators.required],
        reschedule: [this.data.data.reschedule, Validators.required],
      });
    } else {
      this.form = this._fb.group({
        artistID: [this.user?.artistID, Validators.required],
        customerID: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        cost: ['', Validators.required],
        startDateStr: ['', Validators.required],
        endDateStr: ['', Validators.required],
        tattooLocation: ['', Validators.required],
        comments: ['', Validators.required],
        cancelled: ['', Validators.required],
        noShow: ['', Validators.required],
        reschedule: ['', Validators.required],
      });
    }
  }

  getCustomers() {
    this._apiService.GetData('customer', 'allCustomers', '').subscribe(
      (res: any) => {
        this.customers = res.result;
        console.log(this.customers);
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

  addSchedule() {
    if (!this.form.valid) return;
    let data = this.form.value;

    data.startDateStr = new Date(data.startDateStr);
    data.endDateStr = new Date(data.endDateStr);
    data.endTime = new Date(data.endTime);
    data.startTime = new Date(data.startTime);

    data.startDateStr = `${data.startDateStr.getDate()}/${
      data.startDateStr.getMonth() + 1
    }/${data.startDateStr.getFullYear()}`;
    data.endDateStr = `${data.endDateStr.getDate()}/${
      data.endDateStr.getMonth() + 1
    }/${data.endDateStr.getFullYear()}`;

    if (data.startTime.getMinutes() < 10 && data.startTime.getHours() < 10)
      data.startTime = `0${data.startTime.getHours()}:0${data.startTime.getMinutes()}`;
    else if (data.startTime.getMinutes() < 10 && data.startTime.getHours() > 9)
      data.startTime = `${data.startTime.getHours()}:0${data.startTime.getMinutes()}`;
    else if (data.startTime.getMinutes() > 9 && data.startTime.getHours() < 10)
      data.startTime = `0${data.startTime.getHours()}:${data.startTime.getMinutes()}`;
    else
      data.startTime = `${data.startTime.getHours()}:${data.startTime.getMinutes()}`;

    if (data.endTime.getMinutes() < 10 && data.endTime.getHours() < 10)
      data.endTime = `0${data.endTime.getHours()}:0${data.endTime.getMinutes()}`;
    else if (data.endTime.getMinutes() < 10 && data.endTime.getHours() > 9)
      data.endTime = `${data.endTime.getHours()}:0${data.endTime.getMinutes()}`;
    else if (data.endTime.getMinutes() > 9 && data.endTime.getHours() < 10)
      data.endTime = `0${data.endTime.getHours()}:${data.endTime.getMinutes()}`;
    else
      data.endTime = `${data.endTime.getHours()}:${data.endTime.getMinutes()}`;

    if (!this.data.edit) {
      this._apiService.PostData('event', 'saveEvent', data).subscribe(
        (res: any) => {
          console.log(res);
          this.form.reset();
          this._dialogRef.close(true);
        },
        (err) => {
          console.log(err);
          if (err.status == 403) {
            this._toastr.warning('Please Login Again');
            this._authService.logout();
          } else {
            this._toastr.error('Connection Problem');
          }
        }
      );
    } else {
      console.log(data);
      this._apiService
        .PutData('event', `updateEvent/${this.data.data.eventID}`, data)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.form.reset();
            this._dialogRef.close(true);
          },
          (err) => {
            console.log(err);
            if (err.status == 403) {
              this._toastr.warning('Please Login Again');
              this._authService.logout();
            } else {
              this._toastr.error('Connection Problem');
            }
          }
        );
    }
  }

  updateSchedule() {}
}
