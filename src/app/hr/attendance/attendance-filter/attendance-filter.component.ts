import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, zip } from 'rxjs';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
// import { finalize, map, delay } from 'rxjs/operators';
import { HttpServiceService, ApiResponse } from 'src/app/shared/http-service.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance-filter',
  templateUrl: './attendance-filter.component.html',
  styleUrls: ['./attendance-filter.component.scss']
})
export class AttendanceFilterComponent implements OnInit {
  filter: any = {
    name: "",
    surname: "",
    department: "",
    pincode: "",
    date: "",
    start_date: "",
    end_date: ""
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AttendanceFilterComponent>,
    private dialog: MatDialog,
    private httpService: HttpServiceService,
    private datePipe: DatePipe
    // private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }


  confirm() {
    this.filter.date = this.filter.date ?  this.datePipe.transform(this.filter.date, 'yyyy-MM-dd') : "";
    this.filter.start_date =  this.filter.start_date ? this.datePipe.transform(this.filter.start_date, 'yyyy-MM-dd') : "";
    this.filter.end_date =  this.filter.end_date ? this.datePipe.transform(this.filter.end_date, 'yyyy-MM-dd') : "";
    this.dialogRef.close({ data: this.filter })
  }

}
