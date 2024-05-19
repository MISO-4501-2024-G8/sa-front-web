import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TrainingResponse } from '../models/training_response';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl: string = "";
  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<TrainingResponse> {
    this.apiUrl = environment.baseUrl + 'eventos';
    console.log(this.apiUrl);
    return this.http.get<TrainingResponse>(this.apiUrl);
  }
}
