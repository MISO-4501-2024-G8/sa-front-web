import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-strava',
  templateUrl: './strava.component.html',
  styleUrls: ['./strava.component.scss']
})
export class StravaComponent implements OnInit {

  token: string = '';
  role: string = '';
  id: string = '';
  code: string = '';
  state: string = '';
  error: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService,
  ) { }

  ngOnInit() {
    this.token = this.sessionStorageService.getItem('token') ?? '';
    this.role = this.sessionStorageService.getItem('userType') ?? '';
    this.id = this.sessionStorageService.getItem('id') ?? '';
    this.route.queryParams.subscribe(params => {
      console.log("Params: ", params);
    });
  }

  goToConnectStrava() {
    const redirect_uri = environment.strava_redirect_uri + '/' + this.id;
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=125884&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=read,activity:read_all,activity:write&state=register`;
  }

}
