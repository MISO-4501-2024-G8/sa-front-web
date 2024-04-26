import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {TrainingSingleResponse} from '../models/training_single_response';

@Injectable({
  providedIn: 'root'
})
export class MySessionService {

  private apiUrl: string = "";
  constructor(private http: HttpClient) { }

  getTrainingSessionsByUserID(id: string): Observable<TrainingSingleResponse> {
    this.apiUrl = environment.baseUrl + 'training_session/' + id;
    console.log(this.apiUrl);
    return this.http.get<TrainingSingleResponse>(this.apiUrl);
  }

  getEventByID(id: string): Observable<TrainingSingleResponse> {
    this.apiUrl = environment.baseUrl + 'eventos/' + id;
    console.log(this.apiUrl);
    return this.http.get<TrainingSingleResponse>(this.apiUrl);
  }

  getRouteByID(id: string): Observable<TrainingSingleResponse> {
    this.apiUrl = environment.baseUrl + 'rutas/' + id;
    console.log(this.apiUrl);
    return this.http.get<TrainingSingleResponse>(this.apiUrl);
  }

  deleteTrainingSession(id: string): Observable<TrainingSingleResponse> {
    this.apiUrl = environment.baseUrl + 'training_session/' + id;
    console.log(this.apiUrl);
    return this.http.delete<TrainingSingleResponse>(this.apiUrl);
  }

}
