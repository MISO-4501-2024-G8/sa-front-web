import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet, RouterLink } from '@angular/router';
@Component({
  selector: 'app-third',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: './third.component.html',
  styleUrl: './third.component.scss'
})
export class ThirdComponent {

}
