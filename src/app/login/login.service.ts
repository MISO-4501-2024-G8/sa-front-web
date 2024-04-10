import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { LoginUser } from '../models/loginu';
import { LoginUserResponse } from '../models/loginu_response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = "";
  constructor(private http: HttpClient) { }
  loginUser(loginu: LoginUser): Observable<LoginUserResponse> {
    this.apiUrl = environment.baseUrl + 'login/user';
    console.log(loginu);
    console.log(this.apiUrl);
    return this.http.post<LoginUserResponse>(this.apiUrl, loginu);
  }

}
