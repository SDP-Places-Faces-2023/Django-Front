import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpServiceService } from '../http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

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

  constructor(
    private httpService: HttpServiceService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.getAttendanceList()
  }

  getAttendanceList() {
    this.loading = true;
    this.httpService
      .getData('/model_api_connection/list_attendance/', {})
      .subscribe((res) => {
        this.attendanceList = res;
        this.updateDataSource();
        this.loading = false;
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
