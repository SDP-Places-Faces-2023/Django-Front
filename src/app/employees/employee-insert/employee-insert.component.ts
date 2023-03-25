import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, zip } from "rxjs";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { finalize, map, delay } from "rxjs/operators";
import { HttpServiceService, ApiResponse } from "src/app/http-service.service";

@Component({
  selector: 'app-employee-insert',
  templateUrl: './employee-insert.component.html',
  styleUrls: ['./employee-insert.component.scss']
})
export class EmployeeInsertComponent implements OnInit {
  @ViewChild("f", { static: false }) form: NgForm;
  loading: boolean;
  errMessage: string;
  personType: string = "local";
  newEmployeeName: string = "";
  newEmployeeSurname: string = "";
  newEmployeePatronymic: string = "";
  newEmployeePincode: string = "";
  newEmployeeDepartment: string = "";
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      table: any;
    },
    private dialogRef: MatDialogRef<EmployeeInsertComponent>,
    private dialog: MatDialog,
    private httpService: HttpServiceService
  ) {}
  ngOnInit() {}

  onSubmit() {
    const data = {
      name: this.newEmployeeName,
      surname: this.newEmployeeSurname,
      fathers_name: this.newEmployeePatronymic,
      pincode: this.newEmployeePincode,
      department: this.newEmployeeDepartment,
    }

    this.httpService.postData('http://127.0.0.1:9000/model_api_connection/add_employee/', data).subscribe((res: ApiResponse) => {
      if(res.success == true) {
        this.dialogRef.close();
      }
    })
  }
}
