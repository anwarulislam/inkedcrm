import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { GenericApiCallingService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackToastrService } from 'src/app/core/services/snackToastr.service';

@Component({
  selector: 'app-manage-client',
  templateUrl: './manage-client.component.html',
  styleUrls: ['./manage-client.component.scss'],
})
export class ManageClientComponent {
  // To Add or Edit Client

  type: 'update' | 'add' = 'add';

  addClientForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    firstName: new UntypedFormControl(),
    lastName: new UntypedFormControl(),
    telNumber: new UntypedFormControl(),
    email: new UntypedFormControl(),
    instagram: new UntypedFormControl(),
    facebook: new UntypedFormControl(),
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
    this.addClientForm.controls['id'].setValue(promptData?.data?.customerID);

    this.addClientForm.controls['firstName'].setValue(
      promptData?.data?.firstName
    );
    this.addClientForm.controls['lastName'].setValue(
      promptData?.data?.lastName
    );
    this.addClientForm.controls['telNumber'].setValue(
      promptData?.data?.telNumber
    );
    this.addClientForm.controls['email'].setValue(promptData?.data?.email);
    this.addClientForm.controls['instagram'].setValue(
      promptData?.data?.instagram
    );
    this.addClientForm.controls['facebook'].setValue(
      promptData?.data?.facebook
    );
  }

  addClient() {
    this._apiService
      .PostData('customer', 'saveCustomer', this.addClientForm.value)
      .subscribe(
        (res: any) => {
          console.log(res);
          this._toastr.success('Client added successfully');
          // redirect to lists;
          this.addClientForm.reset();
        },
        (err) => {
          console.log(err);
          if (err.status == 403) {
            this._toastr.warning('Please login again');
            this._authService.logout();
          } else {
            let errors = err.error.appsErrorMessages;
            for (const error of errors) {
              this._toastr.error(`${error.errorMessage}`);
            }
          }
        }
      );
  }
  updateClient() {
    this._apiService
      .PutData(
        'customer',
        `updateCustomer/${this.addClientForm.controls['id'].value}`,
        this.addClientForm.value
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this._toastr.success('Client updated successfully');
          // redirect to lists;
          this.addClientForm.reset();
        },
        (err) => {
          console.log(err);
          if (err.status == 403) {
            this._toastr.warning('Please login again');
            this._authService.logout();
          } else {
            let errors = err.error.appsErrorMessages;
            for (const error of errors) {
              this._toastr.error(`${error.errorMessage}`);
            }
          }
        }
      );
    // redirect to lists;
    this.addClientForm.reset();
  }
}
