import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

}
