import { Component, OnInit, AfterViewInit } from '@angular/core';

declare let sidebarFunction:any;
declare let app: any;

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})

export class BaseComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void {
    sidebarFunction();
    app();
  }

}
