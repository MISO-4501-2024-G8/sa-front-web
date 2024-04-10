import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar-user',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.scss'
})
export class NavbarUserComponent {

}
