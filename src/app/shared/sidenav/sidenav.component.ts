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

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent implements OnInit {
  dialogData: any;
  @ViewChild('drawer1') drawer1!: MatSidenav;
  showPassword = false;

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
    private cdr: ChangeDetectorRef
  ) {
    translate.addLangs(['en', 'gr']);
    translate.setDefaultLang('en');

    const browserLang: any = translate.getBrowserLang();
    translate.use(browserLang.match(/en|gr/) ? browserLang : 'en');
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
      }
    });
  }

  toggleShow(): void {
    this.showPassword = !this.showPassword;
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
