import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../utils/session-storage.service';

@Component({
  selector: 'app-navbar-third',
  templateUrl: './navbar-third.component.html',
  styleUrls: ['./navbar-third.component.scss']
})
export class NavbarThirdComponent implements OnInit {

  constructor(
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {
    const a = 1;
  }

  logOut() {
    this.sessionStorageService.removeItem('token');
    this.sessionStorageService.removeItem('userType');
    window.location.href = '/';
  }

}
