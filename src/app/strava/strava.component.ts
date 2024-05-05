import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';
import { environment } from '../../environments/environment';
import { StravaService } from './strava.service';
import { Athlete } from '../models/athlete';
import { StravaUser } from '../models/strava_user';
import { StravaActivity } from '../models/strava_activity';


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
  isProcessing: boolean = true;
  activeUser: boolean = false;
  stravaUser: StravaUser = {} as StravaUser;
  baseAtlhete: Athlete = {} as Athlete;
  userActivities: StravaActivity[] = [] as StravaActivity[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService,
    private stravaService: StravaService
  ) { }

  ngOnInit() {
    this.token = this.sessionStorageService.getItem('token') ?? '';
    this.role = this.sessionStorageService.getItem('userType') ?? '';
    this.id = this.sessionStorageService.getItem('id') ?? '';
    this.route.queryParams?.subscribe(params => {
      console.log("Params: ", params);
      params["error"] ? this.error = params["error"] : this.error = '';
      if(this.error !== '') {
        this.toastr.error('Error al conectar con Strava [' + this.error + ']', 'Error');
      }
    });
    this.getUserActive();
  }

  getUserActive() {
    this.stravaService.isUserActive(this.id).subscribe((res) => {
      console.log(res);
      if (res.code == 200) {
        this.activeUser = true;
        this.stravaUser = res.strava_user as StravaUser;
        this.getStravaData();
      } else {
        this.activeUser = false;
      }
    });
  }

  getStravaData() {
    this.stravaService.getAthleteData(this.id).subscribe((res) => {
      console.log(res);
      if (res.code === 200) {
        this.baseAtlhete = res.athlete as Athlete;
        this.isProcessing = true;
        this.stravaService.getAthleteActivities(this.id).subscribe((res) => {
          console.log(res);
          if (res.code === 200) {
            this.userActivities = res.activities as StravaActivity[];
            if (this.userActivities?.length === 0) {
              this.toastr.info('No hay actividades para mostrar', 'Info');
            }
            this.isProcessing = false;
          } else {
            this.toastr.error('Error obteniendo actividades de Strava', 'Error');
            this.isProcessing = false;
          }
        });
      } else {
        this.toastr.error('Error obteniendo datos de Strava', 'Error');
      }
    });
  }

  goToConnectStrava(isTest: boolean = false) {
    const node_env = process.env["NODE_ENV"];
    let redirect_uri = '';
    if (node_env === 'development') {
      redirect_uri = environment.strava_redirect_uri.replace('auth_callback', 'auth_callback_local') + this.id;
    } else {
      redirect_uri = environment.strava_redirect_uri + this.id;
    }
    if(!isTest) {
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=125884&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=read,activity:read_all,activity:write&state=register`; // NOSONAR
    }
  }

  goToSProfile() {
    const profile_url = "https://www.strava.com/athletes/" + this.stravaUser.athlete_id;
    window.open(profile_url, "_blank");
  }

  goToActivity(activity_id: number) {
    const activity_url = "https://www.strava.com/activities/" + activity_id;
    window.open(activity_url, "_blank");
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  syncData() {
    this.toastr.info('Sincronizando Datos', 'Syncing');
    this.stravaService.syncAthleteData(this.id).subscribe((res) => {
      console.log(res);
      if (res.code === 200) {
        this.toastr.clear();
        this.toastr.success('Data Sincronizada Satisfactoriamente', 'Success');
        this.getUserActive();
      } else {
        this.toastr.error('Error syncing data', 'Error');
      }
    });
  }

}
