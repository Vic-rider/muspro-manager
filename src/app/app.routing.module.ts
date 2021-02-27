import { AuthGuard } from './core/guards/auth.guard';
import { Routes } from "@angular/router";
import { DashboardComponent } from "./views/_fields/dashboard/dashboard.component";
import { LoginComponent } from "./views/auth/login/login.component";
import { ResetPasswordComponent } from "./views/auth/reset-password/reset-password.component";
import { BeneficiaireComponent } from "./views/_fields/beneficiaire/beneficiaire.component";
import { FinancementComponent } from "./views/_fields/financement/financement.component";
import { PartenairesComponent } from "./views/_fields/partenaires/partenaires.component";
import { ProjectComponent } from  './views/_fields/project-management/list-project/project.component';
import { RapportComponent } from "./views/_fields/rapport/rapport.component";
import { TacheronsComponent } from "./views/_fields/tacherons/tacherons.component";
import { BaseComponent } from "./views/layouts/base/base.component";
import { TypeProjectComponent } from "./views/_fields/project-management/type-project/type-project.component";
import { OneRapportComponent } from './views/_fields/rapport/one-rapport/one-rapport.component';


export const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'beneficiaires', component: BeneficiaireComponent },
      { path: 'financements', component: FinancementComponent },
      { path: 'partenaires', component: PartenairesComponent },
      { path: 'projects', component: ProjectComponent },
      { path: 'type-project', component: TypeProjectComponent},
      { path: 'rapports', component: RapportComponent },
      { path: 'rapport/:id', component: OneRapportComponent},
      { path: 'tacherons', component: TacheronsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
]
