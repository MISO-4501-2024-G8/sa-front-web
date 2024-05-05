import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  token: string = '';
  role: string = '';
  id: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService,
  ) { }

  ngOnInit() {
    this.token = this.sessionStorageService.getItem('token') ?? '';
    this.role = this.sessionStorageService.getItem('userType') ?? '';
    this.id = this.sessionStorageService.getItem('id') ?? '';
  }

  goToStravaDashboard() {
    this.router.navigate(['strava']);
  }

}
