import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../utils/session-storage.service';

@Component({
  selector: 'app-sport-session',
  templateUrl: './sport-session.component.html',
  styleUrls: ['./sport-session.component.scss']
})
export class SportSessionComponent implements OnInit {

  token: string = '';
  role: string = '';
  plan: string = '';
  id: string = '';
  name: string = '';
  sport: string = '';
  constructor(
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {
    this.token = this.sessionStorageService.getItem('token') ?? '';
    this.role = this.sessionStorageService.getItem('userType') ?? '';
    this.plan = this.sessionStorageService.getItem('typePlan') ?? '';
    this.id = this.sessionStorageService.getItem('id') ?? '';
    this.name = this.sessionStorageService.getItem('name') ?? '';
    this.sport = this.sessionStorageService.getItem('userSport') ?? '';
  }

}
