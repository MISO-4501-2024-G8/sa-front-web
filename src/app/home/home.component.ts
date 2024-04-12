import { Component } from '@angular/core';
import { SessionStorageService } from '../utils/session-storage.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  constructor(
    private sessionStorageService: SessionStorageService
  ) { }

  actualDate = new Date();
  title = 'sa-front-web';
  token = this.sessionStorageService.getItem('token') ?? '';


}
