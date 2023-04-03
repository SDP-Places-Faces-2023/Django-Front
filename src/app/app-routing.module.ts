import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HrComponent } from "./hr/hr.component";
import { OperatorComponent } from "./operator/operator.component";
import { EmployeesComponent } from "./hr/employees/employees.component";
import { AttendanceComponent } from "./hr/attendance/attendance.component";
import { TrainingComponent } from "./operator/training/training.component";

const routes: Routes = [
  // { path: '', redirectTo: 'operator', pathMatch: 'full' },
  { path: 'hr', component: HrComponent, children: [
    { path: '', redirectTo: 'employees', pathMatch: 'full' },
    { path: 'employees', component: EmployeesComponent },
    { path: 'attendance', component: AttendanceComponent }
  ]},
  { path: 'operator', component: OperatorComponent, children: [
    { path: '', redirectTo: 'training', pathMatch: 'full' },
    { path: 'training', component: TrainingComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {}
}
