import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.globals';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) { }

  upload(file: FileList, data: string): Observable<any> {
    let url = BASE_URL + '/model_api_connection/upload_images/?pincode=' + data
    const formData: FormData = new FormData();

    // const params = new HttpParams()
    // .set('pincode', data)

    for (let i = 0; i < file.length; i++) {
      formData.append('images', file[i], file[i].name);
    }


    return this.http.post<any>(url, formData);
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

  deleteImage(data: string, images: any[]) {
    let url = BASE_URL + '/model_api_connection/delete_files/'
    let httpParams = new HttpParams();
    const formData: FormData = new FormData();
    formData.append('pincode', data);
    for(let i = 0; i < images.length; i++) {
      formData.append('filenames', images[i]);
    }
    // const formData = {
    //   pincode: data,
    //   filenames: images
    // }

    return this.http.post<any>(url, formData);
  }

  bulkDelete(data: string) {
    let url = BASE_URL + '/model_api_connection/delete_images/'
    let httpParams = new HttpParams();
    const formData: FormData = new FormData();
    formData.append('pincode', data);

    // const formData = {
    //   pincode: data
    // }
    
    return this.http.post<any>(url, formData);
  }

  hasImages(data: string) {
    let url = BASE_URL + '/model_api_connection/has_images/'
    const formData: FormData = new FormData();
    formData.append('pincode', data);
    

    return this.http.post<any>(url, formData);
  }
}

export interface Response {
  response: any,
  success: boolean
}
  