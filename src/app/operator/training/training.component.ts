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

  ngOnInit() {}

  checkModelStatus() {
    this.httpService
      .getData('/model_api_connection/list_employees/', {})
      .subscribe((res) => {
        this.modelStatus = res;
      });
  }
  startTrain() {
    this.httpService
      .getData('/model_api_connection/list_employees/', {})
      .subscribe((res) => {
        this.trainHistory = res;
      });
  }
  startCamera() {}
  stopCamera() {}
}
