import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.globals';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Moment } from 'moment';
import * as moment from 'moment';


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

  postDataEmployee(api: string, data: any): Observable<any> {

    let url = BASE_URL + api
    const formData: FormData = new FormData();
    formData.append('name', data.name);
    formData.append('surname', data.surname);
    formData.append('pincode', data.pincode);
    formData.append('department', data.department);

    // const formData: FormData = new FormData();
    formData.append
    
      return this.http.post<any>(url,formData).pipe(
        catchError(error => {
          // Handle the error here, e.g. log it to the console
          console.error('An error occurred:', error);
          // Return an observable with a user-friendly error message
          return throwError('Something went wrong, please try again later.');
        })
      );
  }

  postDataAttendance(api: string, data: any): Observable<any> {

    let url = BASE_URL + api
    const formData: FormData = new FormData();
    formData.append('name', data.name);
    formData.append('surname', data.surname);
    formData.append('pincode', data.pincode);
    formData.append('department', data.department);
    formData.append('date', data.date);
    formData.append('start_date', data.start_date);
    formData.append('end_date', data.end_date);

    // const formData: FormData = new FormData();
    formData.append
    
      return this.http.post<any>(url,formData).pipe(
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
  response: {
    database_status: any;
    django_status: any;
    fastapi_status: any;
  };
  success: string;
}
