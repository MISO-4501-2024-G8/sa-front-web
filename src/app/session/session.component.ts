import { Component } from '@angular/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent {

  constructor() { }

  gotopage(page: string) {
    console.log('Navigating to ' + page);
  }

}
