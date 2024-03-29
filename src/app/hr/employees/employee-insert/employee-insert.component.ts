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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-insert',
  templateUrl: './employee-insert.component.html',
  styleUrls: ['./employee-insert.component.scss'],
})
export class EmployeeInsertComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  loading: boolean;
  errMessage: string;
  personType: string = 'local';
  newEmployeeName: string = '';
  newEmployeeSurname: string = '';
  newEmployeePatronymic: string = '';
  newEmployeePincode: string = '';
  newEmployeeDepartment: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmployeeInsertComponent>,
    private dialog: MatDialog,
    private httpService: HttpServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if(this.data) {
      this.getEditValues()
    }
  }
  getEditValues() {
    this.newEmployeeName = this.data.name;
    this.newEmployeeSurname = this.data.surname;
    this.newEmployeePatronymic = this.data.patronymic;
    this.newEmployeePincode = this.data.pincode;
    this.newEmployeeDepartment = this.data.department;
  }

  onSubmit() {
    const postData = new FormData();
    postData.append('name', this.newEmployeeName);
    postData.append('surname', this.newEmployeeSurname);
    postData.append('patronymic', this.newEmployeePatronymic);
    postData.append('pincode', this.newEmployeePincode);
    postData.append('department', this.newEmployeeDepartment);

    this.httpService
      .postData(
        '/model_api_connection/add_employee/',
        postData
      )
      .subscribe((res: ApiResponse) => {
          if (res.success) {
            this.openSnackBar('Employee added successfully', 'INSERT');
            this.dialogRef.close();
          } else {
            this.openSnackBar(`Error: ${res.error}`, 'ERROR');
          }
      });
  }

  onEdit() {
    const postData = new FormData();
    postData.append('employee_id', this.data.pk);

    postData.append('name', this.newEmployeeName);
    postData.append('surname', this.newEmployeeSurname);
    postData.append('patronymic', this.newEmployeePatronymic);
    postData.append('pincode', this.newEmployeePincode);
    postData.append('department', this.newEmployeeDepartment);

    this.httpService
      .postData(
        '/model_api_connection/edit_employee/',
        postData
      )
      .subscribe((response) => {
        if (response.success) {
          this.openSnackBar('Employee updated successfully', 'UPDATE');
          this.dialogRef.close();
        } else {
          this.openSnackBar(`Error: ${response.error}`, 'ERROR');
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
