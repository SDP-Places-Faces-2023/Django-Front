import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) {}

  getData(url: string, data: any) {
    let httpParams = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, data[key]);
      }
    }
  
    return this.http.get<string[]>(url, { params: httpParams });
  }

  postData(url: string, data: FormData): Observable<any> {
      return this.http.post<any>(url, data);
  }
}

export interface ApiResponse {

  success: boolean;

  // add any other properties that the API response may include

}
