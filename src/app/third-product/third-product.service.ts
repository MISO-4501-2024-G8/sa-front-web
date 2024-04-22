import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ThirdProductAllResponse } from '../models/thirdpall_response';
import { NormalResponse } from '../models/normal_response';

@Injectable({
  providedIn: 'root'
})
export class ThirdProductService {
  private apiUrl: string = "";
  constructor(private http: HttpClient) { }

  getAllThirdProductsbyID(iduser:string): Observable<ThirdProductAllResponse> {
    this.apiUrl = environment.baseUrl + 'third/third_product/' + iduser;
    console.log(this.apiUrl);
    return this.http.get<ThirdProductAllResponse>(this.apiUrl);
  }

  deleteThirdProduct(idTProduct:string):Observable<NormalResponse>{
    this.apiUrl = environment.baseUrl + 'third/third_product/' + idTProduct;
    console.log(this.apiUrl);
    return this.http.delete<NormalResponse>(this.apiUrl);
  }

}
