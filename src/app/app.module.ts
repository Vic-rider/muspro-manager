import { ProjectTypeService } from './core/services/project-type.service';
import { ProjectService } from './core/services/project.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
import { routes } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './views/_fields/dashboard/dashboard.component';
import { LoginComponent } from './views/auth/login/login.component';
import { ResetPasswordComponent } from './views/auth/reset-password/reset-password.component';
import { BeneficiaireComponent } from './views/_fields/beneficiaire/beneficiaire.component';
import { FinancementComponent } from './views/_fields/financement/financement.component';
import { PartenairesComponent } from './views/_fields/partenaires/partenaires.component';
import { ProjectComponent } from './views/_fields/project-management/list-project/project.component';
import { RapportComponent } from './views/_fields/rapport/rapport.component';
import { TacheronsComponent } from './views/_fields/tacherons/tacherons.component';
import { BaseComponent } from './views/layouts/base/base.component';
import { FooterComponent } from './views/layouts/footer/footer.component';
import { SidebarComponent } from './views/layouts/sidebar/sidebar.component';
// import { MaterialModule } from './core/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeProjectComponent } from './views/_fields/project-management/type-project/type-project.component';
import { ViewProjectComponent } from './views/_fields/project-management/view-project/view-project.component';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';

//services
import { TacheronsService } from './core/services/tacherons.service';
import { RapportService } from './core/services/rapport.service';
import { PartenaireService } from './core/services/partenaire.service';
import { FinancementService } from './core/services/financement.service';
import { AuthService } from './core/services/auth.service';
import { BenéficiareService } from './core/services/benéficiare.service';
import { DashboardService } from './core/services/dashboard.service';
import { OneRapportComponent } from './views/_fields/rapport/one-rapport/one-rapport.component';
import { SafePipe } from './core/pipe/safepipe.pipe';
import { NgxDocViewerModule, } from 'doc-viewer-angular/modules'
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
    TypeProjectComponent,
    ViewProjectComponent,
    RapportComponent,
    TacheronsComponent,
    BaseComponent,
    FooterComponent,
    SidebarComponent,
    OneRapportComponent,
    SafePipe,

    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    //@ts-ignore
    // 3. Initialize
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireDatabaseModule,
    // AngularFirestoreCollection,
    // AngularFirestoreDocument

    //NgxDocViewerModule
    // NgxDocViewerModule

  ],
  providers: [AuthService, BenéficiareService, DashboardService, FinancementService, ProjectService, ProjectTypeService, PartenaireService, RapportService, TacheronsService],
  bootstrap: [AppComponent]
})

export class AppModule { }
