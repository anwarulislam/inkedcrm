import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  allCustomers() {
    const options = {
      headers: new HttpHeaders(),
    };
    return this.http.get(
      environment.baseurl + 'api/v1/customers/allCustomers',
      options
    );
  }

  newCustomer(data: any) {
    return this.http.post(
      environment.baseurl + 'api/v1/customers/newCustomer',
      data
    );
  }

  updated() {
    const params = {};
    return this.http.put(
      environment.baseurl + 'api/v1/customers/updated',
      params
    );
  }
}
