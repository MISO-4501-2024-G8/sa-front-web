import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ThirdProductAllResponse } from '../models/thirdpall_response';

@Injectable({
  providedIn: 'root'
})
export class ThirdDetailService {

  private apiUrl: string = "";
  constructor(private http: HttpClient) { }
  getThirdServices(iduser:string): Observable<ThirdProductAllResponse> {
    this.apiUrl = environment.baseUrl + 'third/third_product/' + iduser;
    console.log(this.apiUrl);
    return this.http.get<ThirdProductAllResponse>(this.apiUrl);
  }

}
