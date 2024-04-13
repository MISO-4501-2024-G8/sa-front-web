import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { SignupUser } from '../models/signupu';
import { SignupUserResponse } from '../models/signupu_response';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl: string = "";
  constructor(private http: HttpClient) { }
  signupUser(signupu: SignupUser): Observable<SignupUserResponse> {
    this.apiUrl = environment.baseUrl + 'register/sport_user';
    signupu.user_type = "S";
    console.log(signupu);
    console.log(this.apiUrl);
    return this.http.post<SignupUserResponse>(this.apiUrl, signupu);
  }

}
