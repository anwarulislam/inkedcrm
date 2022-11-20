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
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent implements OnInit {
  dialogData: any;
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

  addClientForm = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    tel: new FormControl(),
    email: new FormControl(),
    instagram: new FormControl(),
    facebook: new FormControl(),
  });

  addArtistForm = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    role: new FormControl(),
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
    private _authService:AuthService
  ) {
    for(const lang of this.langs){
      translate.addLangs([lang.value]);
    }

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
          this.addClientForm.controls['id'].setValue(this.dialogData?.data?.id);

          this.addClientForm.controls['firstName'].setValue(
            this.dialogData?.data?.firstName
          );
          this.addClientForm.controls['lastName'].setValue(
            this.dialogData?.data?.lastName
          );
          this.addClientForm.controls['tel'].setValue(
            this.dialogData?.data?.tel
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
    this.sidenavService.$dynamicForm.next('close');
    this.addClientForm.reset();
    this.drawer1.close();
  }
  updateClient() {
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
    this.sidenavService.$dynamicForm.next('close');
    this.addArtistForm.reset();
    this.drawer1.close();
  }
}
