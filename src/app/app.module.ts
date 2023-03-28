import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeInsertComponent } from './employees/employee-insert/employee-insert.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeeImageComponent } from './employees/employee-image/employee-image.component';
import { HeaderComponent } from './header/header.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AttendanceComponent } from './attendance/attendance.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [			
    AppComponent,
    EmployeesComponent,
    EmployeeInsertComponent,
    EmployeeImageComponent,
    HeaderComponent,
      AttendanceComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [
    EmployeeInsertComponent,
    EmployeeImageComponent
  ]
})
export class AppModule { }
