import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, zip } from "rxjs";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { finalize, map, delay } from "rxjs/operators";

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
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      table: any;
    },
    private dialogRef: MatDialogRef<EmployeeInsertComponent>,
    private dialog: MatDialog,
  ) {}
  ngOnInit() {}

  // onSubmit() {
  //   if (!this.form.valid) {
  //     return;
  //   }
  //   if (this.loading) {
  //     return;
  //   }
  //   this.loading = true;
  //   this.getPersonPelcByPincode()
  //     .pipe(finalize(() => (this.loading = false)))
  //     .subscribe((pelcByPincodeData) => {
  //       const ref = this.dialog.open(ListenerFormComponent, {
  //         ...TableDialogConfig,
  //         data: {
  //           row: {
  //             ...pelcByPincodeData,
  //             pincode: this.form.form.value.pincode,
  //           },
  //           pincodeDialogFormValue: this.form.value,
  //           table: this.data.table,
  //         },
  //       });
  //     });
  // }
}
