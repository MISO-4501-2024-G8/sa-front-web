import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../utils/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-third-home',
  templateUrl: './third-home.component.html',
  styleUrls: ['./third-home.component.scss']
})
export class ThirdHomeComponent implements OnInit{

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) { }

  actualDate = new Date();
  title = 'sa-front-web';
  token = this.sessionStorageService.getItem('token') ?? '';
  role = this.sessionStorageService.getItem('userType') ?? '';

  ngOnInit() {
    console.log("Token: ", this.token);
    console.log("Role: ", this.role);
    if (this.token === '') {
      this.router.navigate(['/login']);
    }
    if (this.role === '1') {
      this.router.navigate(['/home']);
    }
  }

}
