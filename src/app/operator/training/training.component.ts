import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/shared/http-service.service';
import { interval } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { ServerStatusService } from '../../shared/server-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UnrecognizedComponent } from './unrecognized/unrecognized.component';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  constructor(
    private httpService: HttpServiceService,
    public serverStatus: ServerStatusService,
    public _snackBar: MatSnackBar,
    private dialog: MatDialog
    ) {}
  modelStatus: any;
  trainHistory: any;
  cameraStatus: any;
  frameInfo: any;
  cam: boolean = false;
  modelSuccess: boolean = false;
  trainStatus: boolean = false;
  loading: boolean = false;


  ngOnInit() {
    this.checkModelStatus()
  }

  checkModelStatus() {
    this.httpService
      .getData('/model_api_connection/training_status/', {})
      .subscribe((res) => {
        this.modelStatus = res.response;
        if(res.response.status == "No training job found") {
          this.modelSuccess = false;
        } else {
          this.modelSuccess = res.success;
        }

      });
  }
  startTrain() {
    this.loading = true;
    this.httpService
      .postData2('/model_api_connection/train_model/')
      .subscribe((res) => {
        this.trainHistory = res.response;
        if(res.success) {
          this.trainStatus = res.success;
        } else {
          this.openSnackBar(res.error, "ERROR")
        }
        this.loading = false
      });
  }
  startCamera() {
    this.httpService
      .getData('/model_api_connection/start_subscription/', {})
      .subscribe((res) => {
        if(res.success) {
          this.cameraStatus = res.response;
          this.cam = true;
          this.sendRequests()
        } else {
          this.openSnackBar("Camera cannot be opened", "ERROR")
        }
      });
  }
  stopCamera() {
    this.httpService
      .getData('/model_api_connection/stop_subscription/', {})
      .subscribe((res) => {
        if(res.success) {
          this.cameraStatus = res.response;
          this.cam = false;
        } else {
          this.openSnackBar("Something went wrong", "ERROR")
          this.cam = false;
        }
      });
  }

  getFrames() {

  }

  sendRequests() {
    const intervalTime = 705;
    const maxRequests = 10000000000000000000;
    let numRequests = 0;

    interval(intervalTime)
      .pipe(
        takeWhile(() => this.cam == true),
        take(maxRequests)
      )
      .subscribe(() => {
        if (numRequests < maxRequests) {
          this.httpService
          .getData('/model_api_connection/get_frame/', {})
          .subscribe((res) => {
            this.frameInfo = res.response;
          });
          numRequests++;
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  getUnrecognizedFolders() {
    const dialogRef = this.dialog.open(UnrecognizedComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.getEmployees()
    // });
  }
}
