import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../utils/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private sessionStorageServiceHome: SessionStorageService,
    private router: Router
  ) { }



  actualDate: Date = new Date();
  title: string = '';
  token: string = '';
  role: string = '';

  ngOnInit() {
    this.actualDate = new Date();
    this.title = 'sa-front-web - home';
    this.token = this.sessionStorageServiceHome.getItem('token') ?? '';
    this.role = this.sessionStorageServiceHome.getItem('userType') ?? '';
  }


}
