import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/shared/http-service.service';
import { interval } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { ServerStatusService } from '../../shared/server-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  constructor(
    private httpService: HttpServiceService,
    public serverStatus: ServerStatusService,
    public _snackBar: MatSnackBar
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
        this.modelSuccess = this.modelStatus.success;
      });
  }
  startTrain() {
    this.loading = true;
    this.httpService
      .postData2('/model_api_connection/train_model/')
      .subscribe((res) => {
        this.trainHistory = res;
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
    const intervalTime = 100; // 100 milliseconds between requests
    const requestsPerInterval = 10;
    const maxRequests = 10000000000000000000;
    let numRequests = 0;
  
    interval(intervalTime)
      .pipe(
        takeWhile(() => this.cam == true),
        take(maxRequests / requestsPerInterval)
      )
      .subscribe(() => {
        for (let i = 0; i < requestsPerInterval; i++) {
          this.httpService
          .getData('/model_api_connection/get_frame/', {})
          .subscribe((res) => {
            this.frameInfo = res.response;
          });
          if (numRequests >= maxRequests) {
            break;
          }
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
