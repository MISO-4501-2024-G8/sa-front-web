import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../utils/session-storage.service';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private sessionStorageServiceHome: SessionStorageService,
    private router: Router,
    private homeService: HomeService
  ) { }



  actualDate: Date = new Date();
  title: string = '';
  token: string = '';
  role: string = '';
  id: string = '';

  ngOnInit() {
    this.actualDate = new Date();
    this.title = 'sa-front-web - home';
    this.token = this.sessionStorageServiceHome.getItem('token') ?? '';
    this.role = this.sessionStorageServiceHome.getItem('userType') ?? '';
    this.id = this.sessionStorageServiceHome.getItem('id') ?? '';

  }

}
