import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {


  constructor(private http: HttpClient) { }
  allTemplates() {
    const options = {
      headers: new HttpHeaders()
    };
    return this.http.get(environment.baseurl + 'api/v1/templates/allTemplates', options);
  }

  newTemplate(data: any) {
    return this.http.post(environment.baseurl + 'api/v1/templates/newTemplate', data);
  }

  updated() {
    const params = {

    };
    return this.http.put(environment.baseurl + 'api/v1/templates/updated', params);
  }

  deleted() {
    const options = {
      headers: new HttpHeaders()
    };
    return this.http.delete(environment.baseurl + 'api/v1/templates/deleted', options);
  }
}
