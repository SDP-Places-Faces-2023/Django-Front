import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';


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
  
    return this.http.get(url, { params: httpParams });
  }

  postData(url: string, data: any) {
    return this.http.post(url, JSON.stringify(data));
  }
}
