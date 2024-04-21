import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ThirdProductResponse} from '../models/thirdp_response';

@Injectable({
  providedIn: 'root'
})
export class ThirdProductService {
  private apiUrl: string = "";
  constructor(private http: HttpClient) { }

  getAllThirdProductsbyID(iduser:string): Observable<ThirdProductResponse[]> {
    this.apiUrl = environment.baseUrl + 'third/third_product/' + iduser;
    console.log(this.apiUrl);
    return this.http.get<ThirdProductResponse[]>(this.apiUrl);
  }

}
