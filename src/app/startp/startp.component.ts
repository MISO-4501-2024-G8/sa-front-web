import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';


@Component({
  selector: 'app-startp',
  templateUrl: './startp.component.html',
  styleUrls: ['./startp.component.scss'],
  providers: [NavbarComponent]
})
export class StartpComponent {

  constructor() { }

}
