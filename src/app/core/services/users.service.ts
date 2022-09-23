import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) { }

  allUsers() {
    const options = {
      headers: new HttpHeaders()
    };
    return this.http.get(environment.baseurl + 'api/v1/user/allUsers', options);
  }

  created(data: any) {
    return this.http.post(environment.baseurl + 'api/v1/user/created', data);
  }

  updated() {
    const params = {

    };
    return this.http.put(environment.baseurl + 'api/v1/user/updated', params);
  }

  deleted() {
    const options = {
      headers: new HttpHeaders()
    };
    return this.http.delete(environment.baseurl + 'api/v1/user/deleted', options);
  }

}
