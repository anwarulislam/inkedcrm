import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericApiCallingService {
  baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseurl;
  }
  GetData<T>(
    controllerName: any,
    methodName: any,
    options: any
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${controllerName}/${methodName}${options}`
    );
  }

  GetFile<T>(filePath: any): Observable<Blob> {
    return this.http.get(filePath, { responseType: 'blob' });
  }

  PostData<T>(
    controllerName: any,
    methodName: any,
    data: any
  ): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/${controllerName}/${methodName}`,
      data
    );
  }

  PutData<T>(controllerName: any, methodName: any, data: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${controllerName}/${methodName}`,
      data
    );
  }

  DeleteData<T>(
    controllerName: any,
    methodName: any,
    opations: any
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/${controllerName}/${methodName}${opations}`
    );
  }
}
