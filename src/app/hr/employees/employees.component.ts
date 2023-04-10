import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpServiceService } from 'src/app/shared/http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeInsertComponent } from './employee-insert/employee-insert.component';
import { EmployeeImageComponent } from './employee-image/employee-image.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServerStatusService } from '../../shared/server-status.service';
import { EmployeeFilterComponent } from './employee-filter/employee-filter.component';


interface Employee {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  pincode: string;
  department: string;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'patronymic',
    'pincode',
    'department',
    'actions',
  ];
  django: boolean;
  dataSource = new MatTableDataSource<Employee>();
  loading: boolean;
  employeeList: any;
  filter: any;

  constructor(
    private httpService: HttpServiceService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public serverStatus: ServerStatusService
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.loading = true;
    this.httpService
      .getData('/model_api_connection/list_employees/', {})
      .subscribe((res) => {
        this.employeeList = res;
        this.updateDataSource();
        this.loading = false;
      });
  }

  getEmployees2() {
    this.loading = true;
    this.httpService
      .postData3('/model_api_connection/list_employees/', this.filter)
      .subscribe((res) => {
        this.employeeList = res;
        this.updateDataSource();
        this.loading = false;
      });
  }

  updateDataSource() {
    let cnt = 1;
    const newData: Employee[] = this.employeeList.map((employee) => {
      return {
        id: cnt++,
        name: employee.fields.name,
        surname: employee.fields.surname,
        patronymic: employee.fields.patronymic,
        pincode: employee.fields.pincode,
        department: employee.fields.department,
        pk: employee.pk
      };
    });
    this.dataSource.data = newData;
  }

  onAddPerson() {
    const dialogRef = this.dialog.open(EmployeeInsertComponent, {
      position: { right: '0' },
      height: '100vh',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getEmployees()
    });
  }

  onOpenFilter() {
    const dialogRef = this.dialog.open(EmployeeFilterComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.filter = result.data
      this.getEmployees2()
    });
  }

  onAddImages(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeImageComponent, {
      position: { right: '0' },
      height: '100vh',
      width: '800px',
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getEmployees()
    });
  }

  editEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeInsertComponent, {
      position: { right: '0' },
      height: '100vh',
      width: '400px',
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getEmployees()
    });
  }

  deleteEmployee(employee: Employee) {
    const postData = new FormData();
    postData.append('pincode', employee.pincode);

    this.httpService
      .postData(
        '/model_api_connection/delete_employee/',
        postData
      )
      .subscribe((res) => {
        if (res.success) {
          this.openSnackBar('Employee deleted successfully', 'DELETE');
          this.getEmployees();
        } else {
          this.openSnackBar(`Error: ${res.error}`, 'ERROR');
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
