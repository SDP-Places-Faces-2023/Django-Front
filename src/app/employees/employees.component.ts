import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpServiceService } from '../http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeInsertComponent } from './employee-insert/employee-insert.component';

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
  dataSource = new MatTableDataSource<Employee>();
  loading: boolean;
  employeeList: any;

  constructor(
    private httpService: HttpServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.loading = true;
    this.httpService
      .getData('http://127.0.0.1:9000/model_api_connection/list_employees/', {})
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
    // Call the delete_employee API endpoint

    const postData = new FormData();

    postData.append('pincode', employee.pincode);

    this.httpService
      .postData(
        'http://127.0.0.1:9000/model_api_connection/delete_employee/',
        postData
      )
      .subscribe((response) => {
        if (response.success) {
          console.log('Employee deleted:', response.deleted);

          // Remove the deleted employee from the data source

          this.getEmployees();
        } else {
          console.log('Error deleting employee:', response.error);
        }
      });
  }
}
