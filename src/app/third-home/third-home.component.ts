import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../utils/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-third-home',
  templateUrl: './third-home.component.html',
  styleUrls: ['./third-home.component.scss']
})
export class ThirdHomeComponent implements OnInit {

  constructor(
    private sessionStorageServiceTHome: SessionStorageService,
    private router: Router
  ) { }

  actualDate: Date = new Date();
  title: string = '';
  token: string = '';
  role: string = '';

  ngOnInit() {
    this.actualDate = new Date();
    this.title = 'sa-front-web - third-home';
    this.token = this.sessionStorageServiceTHome.getItem('token') ?? '';
    this.role = this.sessionStorageServiceTHome.getItem('userType') ?? '';
  }

}
