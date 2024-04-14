import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../utils/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{

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
    if (this.role === '2') {
      this.router.navigate(['/third-home']);
    }
  }


}
