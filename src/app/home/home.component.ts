import { Component } from '@angular/core';
import { NavbarUserComponent } from '../navbar-user/navbar-user.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  actualDate = new Date();
  title = 'sa-front-web';
}
