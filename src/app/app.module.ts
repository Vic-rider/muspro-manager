import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
import { routes } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './views/_fields/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { BeneficiaireComponent } from './views/_fields/beneficiaire/beneficiaire.component';
import { FinancementComponent } from './views/_fields/financement/financement.component';
import { PartenairesComponent } from './views/_fields/partenaires/partenaires.component';
import { ProjectComponent } from './views/_fields/project/project.component';
import { RapportComponent } from './views/_fields/rapport/rapport.component';
import { TacheronsComponent } from './views/_fields/tacherons/tacherons.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ResetPasswordComponent,
    BeneficiaireComponent,
    FinancementComponent,
    PartenairesComponent,
    ProjectComponent,
    RapportComponent,
    TacheronsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
