import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { User } from './../../../core/models/user';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

declare let sidebarFunction:any;
declare let app: any;
declare let dash: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, AfterViewInit {

  user = new User();
  _loader = false;
  logError = false;

  constructor(
    private authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.authService.currentUserName()
  }

  ngAfterViewInit():void {
    sidebarFunction();
    app();
    dash();
  }

  submit() {
    this._loader = true;
    this.logError = false;

    this.authService.loginWithEmail(this.user.email, this.user.password)
    .then((user) => {
      this._loader = false;
      console.log(user)
      localStorage.setItem(environment.musproUserdetail, JSON.stringify(user.user))
      this._router.navigateByUrl('/');
      localStorage.setItem('reload', '123')
    })
    .catch(error => {
      // console.log(error)
      this._loader = false;
      this.logError = true;
      throw error
    });
  }

}
