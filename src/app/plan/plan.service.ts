import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlanResponse } from '../models/plan_response';
import { PlanUpdateResponse } from '../models/plan_upd_response';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private apiUrl: string = "";
  constructor(private http: HttpClient) { }
  getPlanInfo(planType: string): Observable<PlanResponse> {
    this.apiUrl = environment.baseUrl + 'plans/allplans/' + planType;
    console.log(planType);
    console.log(this.apiUrl);
    return this.http.get<PlanResponse>(this.apiUrl);
  }

  getAllPlanInfo(): Observable<PlanResponse[]> {
    this.apiUrl = environment.baseUrl + 'plans/allplans';
    console.log(this.apiUrl);
    return this.http.get<PlanResponse[]>(this.apiUrl);
  }

  updatePlan(planType: string, token:string, iduser:string): Observable<PlanUpdateResponse> {
    this.apiUrl = environment.baseUrl + 'register/typePlanUser/' + iduser;
    console.log(planType);
    console.log(this.apiUrl);
    const plan = {
      typePlan: planType
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<PlanUpdateResponse>(this.apiUrl, plan, { headers });
  }

}
