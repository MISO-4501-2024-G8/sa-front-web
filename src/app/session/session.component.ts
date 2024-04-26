import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  gotopage(page: string) {
    console.log('Navigating to ' + page);
    if(page === 'sportsession') {
      this.router.navigate(['/sport-session']);
    }
    else if(page === 'mysession') {
      this.router.navigate(['/my-session']);
    }
    else {
      this.toastr.info(`La pagina ${page} esta en construccion`, 'Error');
    }
  }

}
