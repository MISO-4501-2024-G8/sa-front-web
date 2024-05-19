import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TrainingSingleResponse } from '../models/training_single_response';
import { SportEvent } from '../models/sport_event';
import { TrainingResponse } from '../models/training_response';

@Injectable({
  providedIn: 'root'
})
export class EventDetailService {
  private apiUrl: string = "";
  constructor(private http: HttpClient) { }

  getEventDetail(id:string): Observable<TrainingSingleResponse> {
    this.apiUrl = environment.baseUrl + 'eventos/' + id;
    console.log(this.apiUrl);
    return this.http.get<TrainingSingleResponse>(this.apiUrl);
  }

  getTrainingSessionsByUserID(id: string): Observable<TrainingSingleResponse> {
    this.apiUrl = environment.baseUrl + 'training_session/' + id;
    console.log(this.apiUrl);
    return this.http.get<TrainingSingleResponse>(this.apiUrl);
  }

  createTrainingSession(data: any): Observable<TrainingResponse> {
    this.apiUrl = environment.baseUrl + 'training_session';
    console.log(this.apiUrl);
    return this.http.post<TrainingResponse>(this.apiUrl, data);
  }

}
