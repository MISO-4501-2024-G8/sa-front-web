import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ThirdProductAllResponse } from '../models/thirdpall_response';
import { CustomerServiceResponse } from '../models/customerservice_response';
import { CustomerService } from '../models/customerservice';

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

  createCustomerService(customer_service_rq:CustomerService): Observable<CustomerServiceResponse> {
    this.apiUrl = environment.baseUrl + 'third/customer_service';
    console.log(this.apiUrl);
    console.log(customer_service_rq);
    return this.http.post<CustomerServiceResponse>(this.apiUrl, customer_service_rq);
  }

}
