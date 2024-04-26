import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { forkJoin, Observable } from 'rxjs';
import { TrainingResponse } from '../models/training_response';

@Injectable({
  providedIn: 'root'
})
export class SportSessionService {
  private apiUrl: string = "";
  constructor(private http: HttpClient) { }

  getTrainingSessionsByUserID(id: string): Observable<TrainingResponse> {
    this.apiUrl = environment.baseUrl + 'training_session/' + id;
    console.log(this.apiUrl);
    return this.http.get<TrainingResponse>(this.apiUrl);
  }

  // Falta el get para obtener los planes de entrenamiento por id de usuario

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

  getCombinedData(id:string): Observable<[TrainingResponse, TrainingResponse, TrainingResponse]> {
    const events$ = this.getAllEvents();
    const routes$ = this.getAllRoutes();
    const trainingSessions$ = this.getTrainingSessionsByUserID(id);
    return forkJoin([events$, routes$, trainingSessions$]);
  }

  createTrainingSession(data: any): Observable<TrainingResponse> {
    this.apiUrl = environment.baseUrl + 'training_session';
    console.log(this.apiUrl);
    return this.http.post<TrainingResponse>(this.apiUrl, data);
  }

}
