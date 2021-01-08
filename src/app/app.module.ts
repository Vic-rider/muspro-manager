import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
import { routes } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { BroderieComponent } from './views/broderie/broderie.component';
import { DispensaireComponent } from './views/dispensaire/dispensaire.component';
import { LogementComponent } from './views/logement/logement.component';
import { LoginComponent } from './views/login/login.component';
import { MosqueComponent } from './views/mosque/mosque.component';
import { MotoComponent } from './views/moto/moto.component';
import { OrphelinatComponent } from './views/orphelinat/orphelinat.component';
import { PuitPompeComponent } from './views/puit-pompe/puit-pompe.component';
import { TahfizComponent } from './views/tahfiz/tahfiz.component';
import { ForageComponent } from './views/forage/forage.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BroderieComponent,
    DispensaireComponent,
    LogementComponent,
    LoginComponent,
    MosqueComponent,
    MotoComponent,
    OrphelinatComponent,
    PuitPompeComponent,
    TahfizComponent,
    ForageComponent,
    ResetPasswordComponent
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
