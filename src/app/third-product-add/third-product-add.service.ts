import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThirdProductResponse } from '../models/thirdp_response';
import { ThirdProduct } from '../models/thirdproduct';

@Injectable({
  providedIn: 'root'
})
export class ThirdProductAddService {
  private apiUrl: string = "";
  constructor(private http: HttpClient) { }
  createThirdProduct(iduser: string, thirdProduct: ThirdProduct): Observable<ThirdProductResponse> {
    this.apiUrl = environment.baseUrl + 'third/third_product';
    console.log(this.apiUrl);
    thirdProduct.id_third_user = iduser;
    return this.http.post<ThirdProductResponse>(this.apiUrl, thirdProduct);
  }

}
