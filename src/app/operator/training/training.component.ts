import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';

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
      });
  }
  stopCamera() {
    this.httpService
      .getData('/model_api_connection/stop_subscription/', {})
      .subscribe((res) => {
        this.cameraStatus = res;
      });
  }
}
