import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../utils/session-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar-third',
  templateUrl: './navbar-third.component.html',
  styleUrls: ['./navbar-third.component.scss']
})
export class NavbarThirdComponent implements OnInit {

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    const a = 1;
  }

  logOut() {
    this.sessionStorageService.removeItem('token');
    this.sessionStorageService.removeItem('userType');
    this.sessionStorageService.removeItem('typePlan');
    this.router.navigate(['/']);
  }

}
