import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpServiceService } from 'src/app/shared/http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerStatusService } from 'src/app/shared/server-status.service';
import { AttendanceFilterComponent } from './attendance-filter/attendance-filter.component';

interface Attendance {
  id: string;
  name: string;
  surname: string;
  date: string;
  pincode: string;
  department: string;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'date',
    'pincode',
    'department',
  ];
  dataSource = new MatTableDataSource<Attendance>();
  loading: boolean;
  attendanceList: any;
  filter: any;

  constructor(
    private httpService: HttpServiceService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public serverStatus: ServerStatusService
  ) { }

  ngOnInit() {
    this.getAttendanceList()
  }

  getAttendanceList() {
    this.loading = true;
    this.httpService
      .getData('/model_api_connection/list_attendance/', {})
      .subscribe((res) => {
        this.attendanceList = res.response;
        this.updateDataSource();
        this.loading = false;
      });
  }

  getAttendanceList2() {
    this.loading = true;
    this.httpService
      .postDataAttendance('/model_api_connection/list_attendance/', this.filter)
      .subscribe((res) => {
        this.attendanceList = res.response;
        this.updateDataSource();
        this.loading = false;
      });
  }

  onOpenFilter() {
    const dialogRef = this.dialog.open(AttendanceFilterComponent, {
      height: '450px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.filter = result.data
      this.getAttendanceList2()
    });
  }

  updateDataSource() {
    let cnt = 1;
    const newData: Attendance[] = this.attendanceList.map((employee) => {
      const myDate = new Date(employee.date)
      return {
        id: cnt++,
        name: employee.employee__name,
        surname: employee.employee__surname,
        date: this.datePipe.transform(myDate, 'MMM dd, yyyy h:mm a'),
        pincode: employee.employee__pincode,
        department: employee.employee__department,
      };
    });
    this.dataSource.data = newData;
  }

}
