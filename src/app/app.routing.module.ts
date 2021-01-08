import { Routes } from "@angular/router";
import { DashboardComponent } from "./views/_fields/dashboard/dashboard.component";
import { LoginComponent } from "./views/login/login.component";
import { ResetPasswordComponent } from "./views/reset-password/reset-password.component";
import { BeneficiaireComponent } from "./views/_fields/beneficiaire/beneficiaire.component";
import { FinancementComponent } from "./views/_fields/financement/financement.component";
import { PartenairesComponent } from "./views/_fields/partenaires/partenaires.component";
import { ProjectComponent } from "./views/_fields/project/project.component";
import { RapportComponent } from "./views/_fields/rapport/rapport.component";
import { TacheronsComponent } from "./views/_fields/tacherons/tacherons.component";


export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'beneficiaires', component: BeneficiaireComponent },
  { path: 'financements', component: FinancementComponent },
  { path: 'partenaires', component: PartenairesComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'rapports', component: RapportComponent },
  { path: 'tacherons', component: TacheronsComponent },


  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
]
