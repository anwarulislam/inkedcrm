import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericApiCallingService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackToastrService } from 'src/app/core/services/snackToastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  showPassword = false;

  regsiterForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  constructor(
    private _router:Router,
    private _authService:AuthService,
    private _apiService:GenericApiCallingService,
    private _snackBar: SnackToastrService,
    
  ) {}

  ngOnInit(): void {}

  toggleShow(): void {
    this.showPassword = !this.showPassword;
  }

  register() {
    console.log(this.regsiterForm.value)
    this._apiService.PostData('users','sign-up',this.regsiterForm.value).subscribe((res:any)=>{
      this._snackBar.success('Registered Successfully')
        this._router.navigateByUrl('/login');
    },err=>{
      console.log(err)
      if(err.status == 403){
        this._snackBar.error('Incorrect credentials');
      }
      else if(err.status ==500){
        let errors = err.error.appsErrorMessages;
        for(const error of errors){
          this._snackBar.error(`${error.errorMessage}`);
        }
        this._snackBar.error('Internal Server Error');
      }
    })
    
  }

}
