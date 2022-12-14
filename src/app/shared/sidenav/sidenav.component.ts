import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { GenericApiCallingService } from 'src/app/core/services/api.service';
import { SnackToastrService } from 'src/app/core/services/snackToastr.service';
import { CreateScheduleComponent } from 'src/app/schedule/components/create-schedule/create-schedule.component';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDetailsComponent } from 'src/app/artists/components/appointment-details/appointment-details.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent implements OnInit {
  dialogData: any;
  user:any;
  iterator:any=[1,2,3,4,5,6,7,8,9,10];
  @ViewChild('drawer1') drawer1!: MatSidenav;
  showPassword = false;
  langs:any=[
      {name:'EN',value:'en', },
      {name:'EL',value:'el',},
      {name:'FR',value:'fr',},
      {name:'ES',value:'es', },
      {name:'PT',value:'pt-PT', },
      {name:'IT',value:'it', },
      {name:'DE',value:'de',},
      {name:'SV',value:'sv', },
      {name:'RU',value:'ru', },
      {name:'HE',value:'he',},
      {name:'NO',value:'no',},
      {name:'NL',value:'nl',},
  ]

  addClientForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    firstName: new UntypedFormControl(),
    lastName: new UntypedFormControl(),
    telNumber: new UntypedFormControl(),
    email: new UntypedFormControl(),
    instagram: new UntypedFormControl(),
    facebook: new UntypedFormControl(),
  });

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
    private _authService:AuthService,
    private _dialog:MatDialog,
    private _apiService:GenericApiCallingService,
    private _toastr:SnackToastrService
  ) {
    for(const lang of this.langs){
      translate.addLangs([lang.value]);
    }
    this.user = _authService.getUser();
    translate.setDefaultLang('en');

    const browserLang: any = translate.getBrowserLang();
    // translate.use(browserLang.match(/english|gr/) ? browserLang : 'english');
  }

  

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
        console.log(res)
        this.dialogData = res;
        this.drawer1?.open();
        this.cdr.detectChanges();

        if (this.dialogData?.type == 'Client') {
          this.addClientForm.controls['id'].setValue(this.dialogData?.data?.customerID);

          this.addClientForm.controls['firstName'].setValue(
            this.dialogData?.data?.firstName
          );
          this.addClientForm.controls['lastName'].setValue(
            this.dialogData?.data?.lastName
          );
          this.addClientForm.controls['telNumber'].setValue(
            this.dialogData?.data?.telNumber
          );
          this.addClientForm.controls['email'].setValue(
            this.dialogData?.data?.email
          );
          this.addClientForm.controls['instagram'].setValue(
            this.dialogData?.data?.instagram
          );
          this.addClientForm.controls['facebook'].setValue(
            this.dialogData?.data?.facebook
          );
        }

        if (this.dialogData?.type == 'Artist') {
          this.addArtistForm.controls['id'].setValue(this.dialogData?.data?.artistID);

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
          this.addArtistForm.controls['password'].setValue('');
          this.addArtistForm.controls['role'].setValue(
            this.dialogData?.data?.role
          );
        }

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

  toggleShow(): void {
    this.showPassword = !this.showPassword;
  }

  logout(){
    this._authService.logout();
  }

  closeSidenav() {
    this.sidenavService.$dynamicForm.next('close');
    this.addClientForm.reset();
    this.addArtistForm.reset();
    this.drawer1.close();
  }

  addClient() {
    
    this._apiService.PostData('customer','saveCustomer',this.addClientForm.value).subscribe((res:any)=>{
      console.log(res)
        this._toastr.success('Client added successfully');
        this.sidenavService.$dynamicForm.next('close');
        this.addClientForm.reset();
        this.drawer1.close();
    },err=>{
      console.log(err)
      if(err.status == 403){
        this._toastr.warning('Please login again');
        this._authService.logout();
      }
      else{
        let errors = err.error.appsErrorMessages;
        for(const error of errors){
          this._toastr.error(`${error.errorMessage}`);
        }
        
      }
    })
    
  }
  updateClient() {
    this._apiService.PutData('customer',`updateCustomer/${this.addClientForm.controls['id'].value}`,this.addClientForm.value).subscribe((res:any)=>{
      console.log(res)
        this._toastr.success('Client updated successfully');
        this.sidenavService.$dynamicForm.next('close');
        this.addClientForm.reset();
        this.drawer1.close();
    },err=>{
      console.log(err)
      if(err.status == 403){
        this._toastr.warning('Please login again');
        this._authService.logout();
      }
      else{
        let errors = err.error.appsErrorMessages;
        for(const error of errors){
          this._toastr.error(`${error.errorMessage}`);
        }
        
      }
    })
    this.sidenavService.$dynamicForm.next('close');
    this.addClientForm.reset();
    this.drawer1.close();
  }
  addArtist() {
   
    this.sidenavService.$dynamicForm.next('close');
    this.addArtistForm.reset();
    this.drawer1.close();
  }
  updateArtist() {
    this._apiService.PutData('users',`updateUser/${this.addArtistForm.controls['id'].value}`,this.addArtistForm.value).subscribe((res:any)=>{
      console.log(res)
        this._toastr.success('Artist updated successfully');
        this.sidenavService.$dynamicForm.next('close');
        this.addClientForm.reset();
        this.drawer1.close();
    },err=>{
      console.log(err)
      if(err.status == 403){
        this._toastr.warning('Please login again');
        this._authService.logout();
      }
      else{
        let errors = err.error.appsErrorMessages;
        console.log(errors)
        for(const error of errors){
          this._toastr.error(`${error.errorMessage}`);
        }
        
      } 
    })
    this.sidenavService.$dynamicForm.next('close');
    this.addArtistForm.reset();
    this.drawer1.close();
  }

  eventDetails(event:any){
    console.log(event);
    //"2022-12-10T20:00"
    const dialogRef = this._dialog.open(AppointmentDetailsComponent, {
      width: '650px',
      height:'600px',
      panelClass:'white-background-dialog',
      data:{
        appointment:{
          artistID:event.extendedProps.artistID,
          cancelled:event.extendedProps.cancelled,
          comments:event.title,
          cost:event.extendedProps.cost,
          customerID:event.extendedProps.customerID,
          endTime:event.end.split('T')[1],
          eventID:event.extendedProps.eventID,
          noShow:event.extendedProps.noShow,
          reschedule:event.extendedProps.reschedule,
          startDateStr:`${event.start.split('-')[2].split('T')[0]}/${event.start.split('-')[1]}/${event.start.split('-')[0]}`,
          endDateStr:`${event.end.split('-')[2].split('T')[0]}/${event.end.split('-')[1]}/${event.end.split('-')[0]}`,
          startTime:event.start.split('T')[1],
          tattooLocation:event.extendedProps.tattooLocation,
          userDTO:event.extendedProps.userDTO,
          customerDTO:event.extendedProps.customerDTO,
      }},
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
      if(result){
        // this.getEvents();
      }
    });
  }
}
