import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppointmentDetailsComponent } from '@modules/artists/components/appointment-details/appointment-details.component';
import { GenericApiCallingService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { SnackToastrService } from 'src/app/core/services/snackToastr.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
  dialogData: any;
  iterator: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @ViewChild('drawer1') drawer1!: MatSidenav;
  showPassword = false;

  addArtistForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    firstName: new UntypedFormControl(),
    lastName: new UntypedFormControl(),
    username: new UntypedFormControl(),
    email: new UntypedFormControl(),
    password: new UntypedFormControl(),
    role: new UntypedFormControl(),
  });

  isExpanded: any;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SideNavService,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _apiService: GenericApiCallingService,
    private _toastr: SnackToastrService
  ) {}

  ngOnInit(): void {
    this.isHandset$.subscribe((res) => {
      console.log(res);
      if (res) {
        this.isExpanded = false;
      } else {
        this.isExpanded = true;
      }
    });

    this.sidenavService.$dynamicForm.subscribe((res) => {
      if (res) {
        console.log(res);
        this.dialogData = res;
        this.drawer1?.open();
        this.cdr.detectChanges();

        if (this.dialogData?.type == 'Calendar') {
          this.addArtistForm.controls['id'].setValue(this.dialogData?.data?.id);

          this.addArtistForm.controls['firstName'].setValue(
            this.dialogData?.data?.firstName
          );
          this.addArtistForm.controls['lastName'].setValue(
            this.dialogData?.data?.lastName
          );
          this.addArtistForm.controls['username'].setValue(
            this.dialogData?.data?.username
          );
          this.addArtistForm.controls['email'].setValue(
            this.dialogData?.data?.email
          );
          this.addArtistForm.controls['password'].disable();
          this.addArtistForm.controls['role'].setValue(
            this.dialogData?.data?.role
          );
        }
      }
    });
  }

  closeSidenav() {
    this.sidenavService.$dynamicForm.next('close');
    this.addArtistForm.reset();
    this.drawer1.close();
  }

  eventDetails(event: any) {
    console.log(event);
    //"2022-12-10T20:00"
    const dialogRef = this._dialog.open(AppointmentDetailsComponent, {
      width: '650px',
      height: '600px',
      panelClass: 'white-background-dialog',
      data: {
        appointment: {
          artistID: event.extendedProps.artistID,
          cancelled: event.extendedProps.cancelled,
          comments: event.title,
          cost: event.extendedProps.cost,
          customerID: event.extendedProps.customerID,
          endTime: event.end.split('T')[1],
          eventID: event.extendedProps.eventID,
          noShow: event.extendedProps.noShow,
          reschedule: event.extendedProps.reschedule,
          startDateStr: `${event.start.split('-')[2].split('T')[0]}/${
            event.start.split('-')[1]
          }/${event.start.split('-')[0]}`,
          endDateStr: `${event.end.split('-')[2].split('T')[0]}/${
            event.end.split('-')[1]
          }/${event.end.split('-')[0]}`,
          startTime: event.start.split('T')[1],
          tattooLocation: event.extendedProps.tattooLocation,
          userDTO: event.extendedProps.userDTO,
          customerDTO: event.extendedProps.customerDTO,
        },
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      if (result) {
        // this.getEvents();
      }
    });
  }
}
