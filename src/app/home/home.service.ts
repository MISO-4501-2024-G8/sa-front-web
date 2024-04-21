import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfoResponse } from '../models/userinfo_response';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl: string = "";
  constructor(private http: HttpClient) { }

}
