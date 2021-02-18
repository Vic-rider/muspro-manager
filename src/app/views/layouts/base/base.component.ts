import { environment } from 'src/environments/environment';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

declare let sidebarFunction:any;
declare let app: any;
declare let dash: any;

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})

export class BaseComponent implements OnInit, AfterViewInit {

  user = JSON.parse(localStorage.getItem(environment.musproUserdetail))

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void {
    sidebarFunction();
    app();
    dash();
  }

  logOut() {
    this.authService.signOut();
    localStorage.removeItem(environment.musproUserdetail);
  }

}
