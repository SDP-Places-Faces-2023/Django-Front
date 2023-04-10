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

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.scss']
})
export class EmployeeFilterComponent implements OnInit {
  filter: any = {
    name: "",
    surname: "",
    department: "",
    pincode: ""
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmployeeFilterComponent>,
    private dialog: MatDialog,
    private httpService: HttpServiceService,
    // private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }


  confirm() {
    this.dialogRef.close({ data: this.filter })
  }

}
