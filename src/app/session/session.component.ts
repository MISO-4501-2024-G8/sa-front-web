import { Component } from '@angular/core';
import { NavbarUserComponent } from '../navbar-user/navbar-user.component';
@Component({
  selector: 'app-session',
  standalone: true,
  imports: [NavbarUserComponent],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss'
})
export class SessionComponent {

}
