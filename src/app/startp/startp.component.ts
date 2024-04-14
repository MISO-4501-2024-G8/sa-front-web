import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SessionStorageService } from '../utils/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startp',
  templateUrl: './startp.component.html',
  styleUrls: ['./startp.component.scss'],
  providers: [NavbarComponent]
})
export class StartpComponent implements OnInit{

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) { }

  token = this.sessionStorageService.getItem('token') ?? '';
  role = this.sessionStorageService.getItem('userType') ?? '';
  ngOnInit() {
    console.log("Token: ", this.token);
    console.log("Role: ", this.role);
    if (this.token !== '' && this.role === '1') {
      this.router.navigate(['/home']);
    }
    if (this.token !== '' && this.role === '2') {
      this.router.navigate(['/third-home']);
    }
  }

}
