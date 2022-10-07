import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false;

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private _router:Router,
    private _authService:AuthService
  ) {}

  ngOnInit(): void {}

  toggleShow(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    this._authService.accessToken = 'Test token';
    this._router.navigateByUrl('/dashboard')
  }
}
