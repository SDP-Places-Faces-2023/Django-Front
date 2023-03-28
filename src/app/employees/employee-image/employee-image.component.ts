import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, zip } from 'rxjs';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { finalize, map, delay } from 'rxjs/operators';
import { HttpServiceService, ApiResponse } from 'src/app/http-service.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadService, ImageResponse } from 'src/app/file-upload.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-employee-image',
  templateUrl: './employee-image.component.html',
  styleUrls: ['./employee-image.component.scss']
})
export class EmployeeImageComponent implements OnInit {
  images: any[] = [];
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmployeeImageComponent>,
    private dialog: MatDialog,
    private httpService: HttpServiceService,
    private uploadService: FileUploadService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    console.log(this.data);
    
    const postData = new FormData();
    postData.append('pincode', this.data.pincode);
    this.uploadService.hasImages(this.data.pincode).subscribe((res: ImageResponse) => {
      if (res.has_images) {
        this.getImages()
      }
    })
    
    
    
  }

  getImages() {
    let pincode = this.data.pincode
    const postData = new FormData();
    postData.append('pincode', pincode);

    this.uploadService.getFiles(this.data.pincode).subscribe((res) => {
      this.images = res;
    })

  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    let pincode = this.data.pincode
    const postData = new FormData();
    postData.append('pincode', pincode);
    this.progress = 0;
    this.message = "";

    if (this.currentFile) {
      this.uploadService.upload(this.currentFile, pincode).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            
            this.fileInfos = this.uploadService.getFiles(this.data.pincode);
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        });
    }

  }
}
