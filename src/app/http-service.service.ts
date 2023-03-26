import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from './globalVars';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) {}

  getData(api: string, data: any) {
    let url = BASE_URL + api
    let httpParams = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, data[key]);
      }
    }
  
    return this.http.get<string[]>(url, { params: httpParams });
  }

  postData(api: string, data: FormData): Observable<any> {
    let url = BASE_URL + api
      return this.http.post<any>(url, data);
  }
}

export interface ApiResponse {
  success: boolean;
}
