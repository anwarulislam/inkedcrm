import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private _router: Router) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getUserId() {
    return JSON.parse(localStorage.getItem('user') || '{}')?.artistID;
  }

  /**
   * Setter & getter for refresh token
   */
  set refreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  get refreshToken(): string {
    return localStorage.getItem('refreshToken') ?? '';
  }

  clearStorage() {
    localStorage.clear();
  }

  isLogin(): boolean {
    return localStorage.getItem('accessToken') == null ||
      localStorage.getItem('accessToken') == undefined ||
      localStorage.getItem('accessToken') == ''
      ? false
      : true;
  }

  logout() {
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }
}
