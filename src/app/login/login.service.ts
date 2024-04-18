import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUser } from '../models/loginu';
import { LoginUserResponse } from '../models/loginu_response';
import { TokenValidationResponse } from '../models/token_validation_response';

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
  validateToken(token: string): Observable<TokenValidationResponse> {
    this.apiUrl = environment.baseUrl + 'login/validate_token';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrl, { headers }).pipe(
      map((response: any) => {
        // Aquí mapea el objeto de respuesta del servidor al tipo 'TokenValidationResponse'
        return {
          message: response.message,
          code: response.code,
          exp: response.exp,
          expirationDate: response.expirationDate,
          userType: response.userType,
          typePlan: response.typePlan ?? 'basico'
        } as TokenValidationResponse;
      })
    );
  }

}
