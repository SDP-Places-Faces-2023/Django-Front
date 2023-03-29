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
import {
  FileUploadService,
  ImageResponse,
  UploadResponse,
} from 'src/app/file-upload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employee-image',
  templateUrl: './employee-image.component.html',
  styleUrls: ['./employee-image.component.scss'],
})
export class EmployeeImageComponent implements OnInit {
  images: any[] = [];
  currentFile?: File;
  progress = 0;
  message = '';
  photosForDeletion: any[] = [];
  hasImages: boolean;

  fileName = 'Select File';
  fileInfos?: Observable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmployeeImageComponent>,
    private dialog: MatDialog,
    private httpService: HttpServiceService,
    private uploadService: FileUploadService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log(this.data);

    const postData = new FormData();
    postData.append('pincode', this.data.pincode);
    this.uploadService
      .hasImages(this.data.pincode)
      .subscribe((res: ImageResponse) => {
        if (res.has_images) {
          this.hasImages = res.has_images;
          this.getImages();
        }
      });
  }

  getImages() {
    let pincode = this.data.pincode;
    const postData = new FormData();
    postData.append('pincode', pincode);

    this.uploadService.getFiles(this.data.pincode).subscribe((res) => {
      this.images = res;
    });
  }

  bulkDelete() {
    let pincode = this.data.pincode;

    this.uploadService.bulkDelete(this.data.pincode).subscribe((res) => {
      if (res.success) {
        this.openSnackBar('Image folder deleted', 'DELETE');
        this.dialogRef.close();
      } else {
        this.openSnackBar(`Error: ${res.error}`, 'ERROR');
      }
    });
  }

  deleteImage(filename: string) {
    let pincode = this.data.pincode;
    let image = [filename];

    this.uploadService
      .deleteImage(this.data.pincode, image)
      .subscribe((res) => {
        if (res.success) {
          this.openSnackBar('Image deleted', 'DELETE');
          this.getImages();
        } else {
          this.openSnackBar(`Error: ${res.error}`, 'ERROR');
        }
      });
  }

  // deleteFile(filename: string): void {
  //   this.openConfirmationDialog(this.deleteImage.bind(this), filename);
  // }

  deleteSelectedImages() {
    let pincode = this.data.pincode;

    this.uploadService
      .deleteImage(this.data.pincode, this.photosForDeletion)
      .subscribe((res) => {
        if (res.success) {
          this.openSnackBar('Images deleted', 'DELETE');
          this.getImages();
        } else {
          this.openSnackBar(`Error: ${res.error}`, 'ERROR');
        }
      });
  }

  // deleteSelectedFiles() {
  //   this.openConfirmationDialog(this.deleteSelectedImages.bind(this), '');
  // }

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
    let pincode = this.data.pincode;
    const postData = new FormData();
    postData.append('pincode', pincode);
    this.progress = 0;
    this.message = '';

    this.uploadService
      .upload(this.currentFile, pincode)
      .subscribe((res: UploadResponse) => {
        if (res.success) {
          this.openSnackBar('Images deleted', 'DELETE');
          this.getImages();
        } else {
          this.openSnackBar(`Error: ${res.error}`, 'ERROR');
          this.progress = 0;

          this.currentFile = undefined;
        }
      });
  }

  onToggleChange(event, image) {
    if (event.checked) {
      this.photosForDeletion.push(image.filename);
    } else {
      this.photosForDeletion = this.photosForDeletion.filter(
        (filename) => filename !== image.filename
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  // openConfirmationDialog(func: (value: any) => void, value: any): void {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {});

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === true) {
  //       if(value) {
  //         func(value);
  //       } else {
  //         func();
  //       }

  //     }
  //   });
  // }
}
