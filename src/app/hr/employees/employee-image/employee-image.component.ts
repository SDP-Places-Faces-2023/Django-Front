import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, zip } from 'rxjs';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { finalize, map, delay } from 'rxjs/operators';
import { HttpServiceService, ApiResponse } from 'src/app/shared/http-service.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  FileUploadService,
  Response,
} from 'src/app/shared/file-upload.service';
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
  hasImagesRes: boolean;
  loading: boolean = false;

  fileName = 'Select File';
  fileInfos?: Observable<any>;
  files: any;

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
    this.hasImages()
  }

  hasImages() {
    const postData = new FormData();
    postData.append('pincode', this.data.pincode);
    this.uploadService
      .hasImages(this.data.pincode)
      .subscribe((res: Response) => {
        if (res.response.has_images) {
          this.hasImagesRes = res.response.has_images;
          this.getImages();
        }
      });
  }

  getImages() {
    this.loading = true
    this.images = []
    let pincode = this.data.pincode;
    const postData = new FormData();
    postData.append('pincode', pincode);

    this.uploadService.getFiles(this.data.pincode).subscribe((res) => {
      this.images = res.response;
      this.loading = false
    });
  }

  async bulkDelete() {
    let result = false;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(dialogResult => {
      result = dialogResult;
    });

    await dialogRef.afterClosed().toPromise();

    if(!result) return;
    
    let pincode = this.data.pincode;
    this.loading = true

    this.uploadService.bulkDelete(this.data.pincode).subscribe((res) => {
      if (res.success) {
        this.openSnackBar('Image folder deleted', 'DELETE');
        this.dialogRef.close();
        this.loading = false
      } else {
        this.openSnackBar(`Error: ${res.error}`, 'ERROR');
        this.loading = false
      }
    });
  }

  async deleteImage(filename: string) {
    let result = false;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(dialogResult => {
      result = dialogResult;
    });

    await dialogRef.afterClosed().toPromise();

    if(!result) return;

    let pincode = this.data.pincode;
    let image = [filename];
    this.loading = true

    await this.uploadService
      .deleteImage(this.data.pincode, image)
      .subscribe((res) => {
        if (res.success) {
          this.openSnackBar('Image deleted', 'DELETE');
          this.getImages();
        } else {
          this.openSnackBar(`Error: ${res.error}`, 'ERROR');
          this.loading = false
        }
      });
  }

  // deleteFile(filename: string): void {
  //   this.openConfirmationDialog(this.deleteImage.bind(this), filename);
  // }

  async deleteSelectedImages() {
    let result = false;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(dialogResult => {
      result = dialogResult;
    });

    await dialogRef.afterClosed().toPromise();

    if(!result) return;

    let pincode = this.data.pincode;
    this.loading = true

    this.uploadService
      .deleteImage(this.data.pincode, this.photosForDeletion)
      .subscribe((res) => {
        if (res.success) {
          this.openSnackBar('Images deleted', 'DELETE');
          this.loading = true;
          this.getImages();
        } else {
          this.openSnackBar(`Error: ${res.error}`, 'ERROR');
          this.loading = false;
        }
      });
  }

  // deleteSelectedFiles() {
  //   this.openConfirmationDialog(this.deleteSelectedImages.bind(this), '');
  // }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.files = event.target.files
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    this.images = []
    this.loading = true
    let pincode = this.data.pincode;
    const postData = new FormData();
    postData.append('pincode', pincode);
    this.progress = 0;
    this.message = '';

    function preventReload(e) {
      e.preventDefault();
      e.returnValue = 'mans?';
    }

    window.addEventListener('beforeunload', preventReload);

    this.uploadService
      .upload(this.files, pincode)
      .subscribe((res: Response) => {
        window.removeEventListener("beforeunload",preventReload)
        if (res.success) {
          this.openSnackBar('Images added', 'INSERT');
          this.hasImages()
        } else {
          this.openSnackBar(`Error: ${res.response.error}`, 'ERROR');
          this.progress = 0;
          this.currentFile = undefined;
          this.loading = false
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
