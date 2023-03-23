import { Component, OnInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { HttpServiceService } from '../http-service.service';
import { EmployeeInsertComponent } from './employee-insert/employee-insert.component';
import {MatDialog, MatDialogConfig} from "@angular/material";

interface Employee {
  id: number;
  name: string;
  position: string;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit  {
  employees: Employee[] = [
    { id: 1, name: 'John Doe', position: 'Manager' },
    { id: 2, name: 'Jane Smith', position: 'Developer' },
    { id: 3, name: 'Bob Johnson', position: 'Designer' },
  ];
  displayedColumns: string[] = ['id', 'name', 'position'];
  dataSource = this.employees

  employeeList: any;

  newEmployeeName = '';
  newEmployeePosition = '';
  nextEmployeeId = 4;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private httpService: HttpServiceService,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.httpService.getData('http://127.0.0.1:9000/model_api_connection/list_employees/', {}).subscribe((res) =>{
      this.employeeList = res;
    })
  }

  onAddPerson() {
    const ref = this.dialog.open(EmployeeInsertComponent);
  }


  addEmployee() {
    if (this.newEmployeeName.trim() === '' || this.newEmployeePosition.trim() === '') {
      return;
    }
    const newEmployee: Employee = {
      id: this.nextEmployeeId++,
      name: this.newEmployeeName,
      position: this.newEmployeePosition,
    };
    this.employees.push(newEmployee);
    this.newEmployeeName = '';
    this.newEmployeePosition = '';
  }

  editEmployee(employee: Employee) {
    // handle editing employee
  }

  deleteEmployee(employee: Employee) {
    const index = this.employees.indexOf(employee);
    if (index >= 0) {
      this.employees.splice(index, 1);
    }
  }

}
