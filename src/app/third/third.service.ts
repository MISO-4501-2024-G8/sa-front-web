import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ThirdUserCatalogResponse } from '../models/third_catalog_response';

@Injectable({
  providedIn: 'root'
})
export class ThirdService {
  private apiUrl: string = "";
  constructor(private http: HttpClient) { }

  getThirdCatalog(): Observable<ThirdUserCatalogResponse> {
    this.apiUrl = environment.baseUrl + 'third/third_catalog';
    console.log(this.apiUrl);
    return this.http.get<ThirdUserCatalogResponse>(this.apiUrl);
  }


}
