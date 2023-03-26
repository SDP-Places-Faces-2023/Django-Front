import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from './globalVars';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) { }

  upload(file: File, data: string): Observable<HttpEvent<any>> {
    let url = BASE_URL + '/model_api_connection/upload_images/'
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('pincode', data);

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(data: FormData): Observable<any> {
    let url = BASE_URL + '/model_api_connection/get_images/'
    let httpParams = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, data[key]);
      }
    }
    return this.http.get(url, { params: httpParams });
  }

  deleteFiles(data: FormData) {
    let url = BASE_URL + '/model_api_connection/delete_images/'

    let httpParams = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, data[key]);
      }
    }
    return this.http.post<any>(url, data);
  }

  hasImages(data: FormData) {
    let url = BASE_URL + '/model_api_connection/has_images/'

    let httpParams = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, data[key]);
      }
    }
    return this.http.post<any>(url, { params: httpParams });
  }
}

export interface ImageResponse {
    has_images: boolean;
}
  