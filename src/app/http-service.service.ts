import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from './app.globals';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) {}

  getData(api: string, data: any): Observable<any> {
    let url = BASE_URL + api
    let httpParams = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, data[key]);
      }
    }
  
    return this.http.get<string[]>(url, { params: httpParams }).pipe(
      catchError(error => {
        // Handle the error here, e.g. log it to the console
        console.error('An error occurred:', error);
        // Return an observable with a user-friendly error message
        return throwError('Something went wrong, please try again later.');
      })
    );
  }

  postData(api: string, data: FormData): Observable<any> {
    let url = BASE_URL + api
      return this.http.post<any>(url, data).pipe(
        catchError(error => {
          // Handle the error here, e.g. log it to the console
          console.error('An error occurred:', error);
          // Return an observable with a user-friendly error message
          return throwError('Something went wrong, please try again later.');
        })
      );
  }

  postData2(api: string): Observable<any> {
    let url = BASE_URL + api
      return this.http.post<any>(url, {}).pipe(
        catchError(error => {
          // Handle the error here, e.g. log it to the console
          console.error('An error occurred:', error);
          // Return an observable with a user-friendly error message
          return throwError('Something went wrong, please try again later.');
        })
      );
  }
}

export interface ApiResponse {
  success: boolean;
  error: string
}

export interface StatusResponse {
  database_status: string;
  django_status: string;
  fastapi_status: string;
}
