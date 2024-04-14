import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../utils/session-storage.service';
@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {

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
