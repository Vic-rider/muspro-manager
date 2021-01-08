import { Routes } from "@angular/router";
import { BroderieComponent } from "./views/broderie/broderie.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { DispensaireComponent } from "./views/dispensaire/dispensaire.component";
import { ForageComponent } from "./views/forage/forage.component";
import { BaseComponent } from "./views/layouts/base/base.component";
import { LogementComponent } from "./views/logement/logement.component";
import { LoginComponent } from "./views/login/login.component";
import { MosqueComponent } from "./views/mosque/mosque.component";
import { MotoComponent } from "./views/moto/moto.component";
import { OrphelinatComponent } from "./views/orphelinat/orphelinat.component";
import { PuitPompeComponent } from "./views/puit-pompe/puit-pompe.component";
import { ResetPasswordComponent } from "./views/reset-password/reset-password.component";
import { TahfizComponent } from "./views/tahfiz/tahfiz.component";


export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'borderie', component: BroderieComponent },
  { path: 'dispensaire', component: DispensaireComponent },
  { path: 'logement', component: LogementComponent },
  { path: 'forage', component: ForageComponent},
  { path: 'mosque', component: MosqueComponent },
  { path: 'moto', component: MotoComponent },
  { path: 'orphelinat', component: OrphelinatComponent },
  { path: 'puit-pompe', component: PuitPompeComponent },
  { path: 'tahfiz', component: TahfizComponent },
  { path: 'reset-password', component: ResetPasswordComponent },


  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
]
