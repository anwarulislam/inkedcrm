import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}
  allEvents() {
    const options = {
      headers: new HttpHeaders(),
    };
    return this.http.get(
      environment.baseurl + 'api/v1/events/allEvents',
      options
    );
  }

  newEvent(data: any) {
    return this.http.post(environment.baseurl + 'api/v1/events/newEvent', data);
  }

  updated() {
    const params = {};
    return this.http.put(environment.baseurl + 'api/v1/events/updated', params);
  }
}
