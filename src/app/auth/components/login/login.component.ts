import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { _countGroupLabelsBeforeLegacyOption as _countGroupLabelsBeforeOption } from '@angular/material/legacy-core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { GenericApiCallingService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackToastrService } from 'src/app/core/services/snackToastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false;

  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });

  constructor(
    private _router:Router,
    private _authService:AuthService,
    private _apiService:GenericApiCallingService,
    private _snackBar: SnackToastrService
  ) {}

  ngOnInit(): void {}

  toggleShow(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    console.log(this.loginForm.value)
    this._apiService.PostData('users','sign-in',this.loginForm.value).subscribe((res:any)=>{
      console.log(res);
      this._authService.accessToken = res?.result?.accessToken;
        this._authService.setUser(res.result);
        this._router.navigateByUrl('/dashboard');
    },err=>{
      console.log(err)
      if(err.status == 403){
        this._snackBar.error('Incorrect credentials');
      }
      else if(err.status ==500){
        this._snackBar.error('Internal Server Error');
      }
    })
    
  }
}
