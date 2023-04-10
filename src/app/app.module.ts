import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmployeesComponent } from './hr/employees/employees.component';
import { EmployeeInsertComponent } from './hr/employees/employee-insert/employee-insert.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeeImageComponent } from './hr/employees/employee-image/employee-image.component';
import { HeaderComponent } from './header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AttendanceComponent } from './hr/attendance/attendance.component';
import { DatePipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { OperatorComponent } from './operator/operator.component';
import { HrComponent } from './hr/hr.component';
import { TrainingComponent } from './operator/training/training.component';
import { HomeComponent } from './home/home.component';
import { EmployeeFilterComponent } from './hr/employees/employee-filter/employee-filter.component';
import { AttendanceFilterComponent } from './hr/attendance/attendance-filter/attendance-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeInsertComponent,
    EmployeeImageComponent,
    HeaderComponent,
    AttendanceComponent,
    ConfirmationDialogComponent,
    OperatorComponent,
    HrComponent,
    TrainingComponent,
    HomeComponent,
    EmployeeFilterComponent,
    AttendanceFilterComponent
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
    MatTabsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [
    EmployeeInsertComponent,
    EmployeeImageComponent,
    ConfirmationDialogComponent,
    EmployeeFilterComponent,
    AttendanceFilterComponent
  ],
})
export class AppModule {}
