import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TrainingResponse } from '../models/training_response';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SportSessionService {
  private apiUrl: string = "";
  constructor(private http: HttpClient) { }

  // getTrainingSessionsByUserID(id: string): Observable<TrainingResponse> {
  //   this.apiUrl = environment.baseUrl + 'training_session/' + id;
  //   console.log(this.apiUrl);
  //   return this.http.get<TrainingResponse>(this.apiUrl);
  // }

  getAllEvents(): Observable<TrainingResponse> {
    this.apiUrl = environment.baseUrl + 'eventos';
    console.log(this.apiUrl);
    return this.http.get<TrainingResponse>(this.apiUrl);
  }

  getAllRoutes(): Observable<TrainingResponse> {
    this.apiUrl = environment.baseUrl + 'rutas';
    console.log(this.apiUrl);
    return this.http.get<TrainingResponse>(this.apiUrl);
  }

  getCombinedData(): Observable<[TrainingResponse, TrainingResponse]> {

    const events$ = this.getAllEvents();
    const routes$ = this.getAllRoutes();

    return forkJoin([events$, routes$]);
  }

}
