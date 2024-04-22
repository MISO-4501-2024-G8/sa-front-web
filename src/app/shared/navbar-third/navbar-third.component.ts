import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../utils/session-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar-third',
  templateUrl: './navbar-third.component.html',
  styleUrls: ['./navbar-third.component.scss']
})
export class NavbarThirdComponent implements OnInit {

  name: string = '';

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.name = this.sessionStorageService.getItem('name') ?? '';
  }

  logOut() {
    this.sessionStorageService.removeItem('token');
    this.sessionStorageService.removeItem('userType');
    this.sessionStorageService.removeItem('typePlan');
    this.sessionStorageService.removeItem('id');
    this.sessionStorageService.removeItem('name');
    this.router.navigate(['/']);
  }

}
