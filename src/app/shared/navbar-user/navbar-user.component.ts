import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../utils/session-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) { }

  userPlan: string = '';
  name: string = '';

  ngOnInit() {
    const plan = this.sessionStorageService.getItem('typePlan') ?? '';
    this.name = this.sessionStorageService.getItem('name') ?? '';
    if(plan === 'basico') {
      this.userPlan = 'Básico';
    }else if (plan === 'intermedio') {
      this.userPlan = 'Intermedio';
    }else if (plan === 'premium') {
      this.userPlan = 'Premium';
    }
  }

  logOut() {
    this.sessionStorageService.removeItem('token');
    this.sessionStorageService.removeItem('userType');
    this.sessionStorageService.removeItem('typePlan');
    this.sessionStorageService.removeItem('id');
    this.sessionStorageService.removeItem('name');
    this.sessionStorageService.removeItem('userSport');
    this.router.navigate(['/']);
  }

}
