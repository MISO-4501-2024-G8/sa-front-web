import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  actualDate = new Date();
  title = 'sa-front-web';
  token = localStorage.getItem('token') ?? '';

  constructor() { }
}
