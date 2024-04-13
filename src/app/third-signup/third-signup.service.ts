import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { ThirdUser } from '../models/thirdu';
import { ThirdUserResponse } from '../models/thirdu_response';

@Injectable({
  providedIn: 'root'
})
export class ThirdSignupService {

  private apiUrl: string = "";
  constructor(private http: HttpClient) { }
  thirdSignUpUser(thirdu: ThirdUser): Observable<ThirdUserResponse> {
    this.apiUrl = environment.baseUrl + 'register/third_user';
    thirdu.user_type = "T";
    console.log(thirdu);
    console.log(this.apiUrl);
    return this.http.post<ThirdUserResponse>(this.apiUrl, thirdu);
  }

}
