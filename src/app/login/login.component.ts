import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
