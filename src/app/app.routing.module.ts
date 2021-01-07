import { Routes } from "@angular/router";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { BaseComponent } from "./views/layouts/base/base.component";
import { LoginComponent } from "./views/login/login.component";


export const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  },
  { path: 'login', component: LoginComponent }
]
