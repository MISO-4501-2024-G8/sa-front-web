import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent {

  constructor(
    private router: Router,
  ) { }

  goToSignUpThird() {
    this.router.navigate(['/third-signup']);
  }

}
