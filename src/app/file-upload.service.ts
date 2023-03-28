import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from './app.globals';

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

  // getFiles(data: FormData): Observable<any> {
  //   let url = BASE_URL + '/model_api_connection/get_images/'
  //   let httpParams = new HttpParams();

  //   // const formData: FormData = new FormData();

  //   // formData.append('pincode', data);

  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       httpParams = httpParams.set(key, data[key]);
  //     }
  //   }
  //   return this.http.get<string[]>(url, { params: httpParams }, );
  // }

  getFiles(data: string): Observable<any> {
    const url = BASE_URL + '/model_api_connection/get_images/' + '?' + 'pincode=' + data;
    // const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
  
    return this.http.post<string[]>(url, {});
  }

  deleteFiles(data: string) {
    let url = BASE_URL + '/model_api_connection/delete_images/'

    let httpParams = new HttpParams();

    const formData: FormData = new FormData();

    formData.append('pincode', data);

    const headers = {
      'Access-Control-Allow-Origin': '*'
    };

    
    return this.http.post<any>(url, formData);
  }

  hasImages(data: string) {
    let url = BASE_URL + '/model_api_connection/has_images/'

    let httpParams = new HttpParams().set('pincode', data);

    const formData: FormData = new FormData();

    formData.append('pincode', data);

    const headers = {
      'Access-Control-Allow-Origin': '*'
    };

    return this.http.post<any>(url, formData);
  }
}

export interface ImageResponse {
    has_images: boolean;
}
  