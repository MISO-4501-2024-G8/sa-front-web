import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const a = 1;
  }

  logOut() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

}
