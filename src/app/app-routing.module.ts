import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { EmployeesComponent } from "./employees/employees.component";

const routes: Routes = [
  { path: "", redirectTo: "employees", pathMatch: "full" },
  {
    path: "employees",
    component: EmployeesComponent,
  },
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
