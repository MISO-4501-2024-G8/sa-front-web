import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { WorkoutResponse } from '../models/workout_response';


@Injectable({
  providedIn: 'root'
})
export class StravaService {

  private apiUrl: string = "";
  constructor(private http: HttpClient) { }

  isUserActive(id_user:string): Observable<any> {
    //this.apiUrl = environment.baseUrl + 'strava/athlete';
    this.apiUrl = "http://127.0.0.1:5001/" +"active_user?user_id=" + id_user;
    return this.http.get<any>(this.apiUrl);
  }


  getAthleteData(id_user: string): Observable<WorkoutResponse> {
    //this.apiUrl = environment.baseUrl + 'strava/athlete';
    this.apiUrl = "http://127.0.0.1:5001/" + 'strava_athlete?user_id=' + id_user;
    return this.http.get<WorkoutResponse>(this.apiUrl);
  }

  syncAthleteData(id_user: string): Observable<WorkoutResponse> {
    //this.apiUrl = environment.baseUrl + 'strava/sync';
    this.apiUrl = "http://127.0.0.1:5001/sync_activities?user_id=" + id_user;
    return this.http.post<WorkoutResponse>(this.apiUrl, {});
  }

  getAthleteActivities(id_user: string): Observable<WorkoutResponse> {
    //this.apiUrl = environment.baseUrl + 'strava/activities';
    this.apiUrl = "http://127.0.0.1:5001/strava_activities?user_id=" + id_user;
    return this.http.get<WorkoutResponse>(this.apiUrl);
  }

}
