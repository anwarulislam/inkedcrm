import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { GenericApiCallingService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackToastrService } from 'src/app/core/services/snackToastr.service';

@Component({
  selector: 'app-manage-artist',
  templateUrl: './manage-artist.component.html',
  styleUrls: ['./manage-artist.component.scss'],
})
export class ManageArtistComponent {
  // To Add or Edit Artist

  type: 'update' | 'add' = 'add';
  showPassword: boolean = false;

  addArtistForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    firstName: new UntypedFormControl(),
    lastName: new UntypedFormControl(),
    username: new UntypedFormControl(),
    email: new UntypedFormControl(),
    password: new UntypedFormControl(),
    role: new UntypedFormControl(),
  });

  constructor(
    public translate: TranslateService,
    private _authService: AuthService,
    private _apiService: GenericApiCallingService,
    private _toastr: SnackToastrService
  ) {}

  ngOnInit() {
    // get id from query params and call api to get data and set value in form by calling initForm()
  }

  initForm(promptData: any) {
    this.addArtistForm.controls['id'].setValue(promptData?.data?.artistID);

    this.addArtistForm.controls['firstName'].setValue(
      promptData?.data?.firstName
    );
    this.addArtistForm.controls['lastName'].setValue(
      promptData?.data?.lastName
    );
    this.addArtistForm.controls['username'].setValue(
      promptData?.data?.username
    );
    this.addArtistForm.controls['email'].setValue(promptData?.data?.email);
    this.addArtistForm.controls['password'].setValue('');
    this.addArtistForm.controls['role'].setValue(promptData?.data?.role);
  }

  addArtist() {}
  updateArtist() {
    this._apiService
      .PutData(
        'users',
        `updateUser/${this.addArtistForm.controls['id'].value}`,
        this.addArtistForm.value
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this._toastr.success('Artist updated successfully');
        },
        (err) => {
          console.log(err);
          if (err.status == 403) {
            this._toastr.warning('Please login again');
            this._authService.logout();
          } else {
            let errors = err.error.appsErrorMessages;
            console.log(errors);
            for (const error of errors) {
              this._toastr.error(`${error.errorMessage}`);
            }
          }
        }
      );
    this.addArtistForm.reset();
  }
}
