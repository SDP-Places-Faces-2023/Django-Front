import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';
import { interval } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  constructor(private httpService: HttpServiceService) {}
  modelStatus: any;
  trainHistory: any;
  cameraStatus: any;
  frameInfo: any;
  cam: boolean = false
  


  ngOnInit() {}

  checkModelStatus() {
    this.httpService
      .getData('/model_api_connection/training_status/', {})
      .subscribe((res) => {
        this.modelStatus = res;
      });
  }
  startTrain() {
    this.httpService
      .postData2('/model_api_connection/train_model/')
      .subscribe((res) => {
        this.trainHistory = res;
      });
  }
  startCamera() {
    this.httpService
      .getData('/model_api_connection/start_subscription/', {})
      .subscribe((res) => {
        this.cameraStatus = res;
        this.cam = true;
      });
  }
  stopCamera() {
    this.httpService
      .getData('/model_api_connection/stop_subscription/', {})
      .subscribe((res) => {
        this.cameraStatus = res;
        this.cam = false;
      });
  }

  getFrames() {
    this.httpService
      .getData('/model_api_connection/start_subscription/', {})
      .subscribe((res) => {
        this.frameInfo = res;
      });
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
          this.getFrames();
          if (numRequests >= maxRequests) {
            break;
          }
        }
      });
  }
}
