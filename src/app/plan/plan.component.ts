import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { PlanService } from './plan.service';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';
import { PlanResponse } from '../models/plan_response';
import { Feature } from '../models/feature';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  providers: [NavbarComponent]
})
export class PlanComponent implements OnInit{

  plans: PlanResponse[] = [];
  planBasico: PlanResponse = {} as PlanResponse;
  planIntermedio: PlanResponse = {} as PlanResponse;
  planPremium: PlanResponse = {} as PlanResponse;

  constructor(
    private router: Router,
    private planService: PlanService,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService
  ) { }

  planSelected = this.sessionStorageService.getItem('typePlan') ?? '';
  token = this.sessionStorageService.getItem('token') ?? '';
  role = this.sessionStorageService.getItem('userType') ?? '';
  idUser = this.sessionStorageService.getItem('id') ?? '';
  modalTitle = '';
  features: Feature[] = [];
  descriptionPlan = '';
  selectedPlan = '';

  ngOnInit() {
    this.planService.getAllPlanInfo().subscribe(
      (plans) => {
        this.plans = plans;
        this.planBasico = plans.find(plan => plan.typePlan === 'basico') || {} as PlanResponse;
        this.planIntermedio = plans.find(plan => plan.typePlan === 'intermedio') || {} as PlanResponse;
        this.planPremium = plans.find(plan => plan.typePlan === 'premium') || {} as PlanResponse;
      },
      (error) => {
        console.error("An error occurred: ", error)
        this.toastr.error("An error occurred while trying to get the plans", "Error")
      }
    );
  }

  seleccionarPlan(plan: string) {
    this.planSelected = plan;
    this.selectedPlan = plan;
  }

  verCaracteristicas(plan: string) {
    this.descriptionPlan = plan;
    if (plan === 'basico') {
      this.modalTitle = 'Plan Básico';
      this.features = this.planBasico.features;
    } else if (plan === 'intermedio') {
      this.modalTitle = 'Plan Intermedio';
      this.features = this.planIntermedio.features;
    } else if (plan === 'premium') {
      this.modalTitle = 'Plan Premium';
      this.features = this.planPremium.features;
    }
  }

  updateUserPlan() {
    if (!this.token) {
      this.toastr.error("You must login to update your plan", "Error")
      return;
    }
    if (!this.planSelected) {
      this.toastr.error("You must select a plan to update", "Error")
      return;
    }
    this.planService.updatePlan(this.planSelected, this.token, this.idUser).subscribe(
      (response) => {
        console.info("The plan was updated: ", response)
        if (response.code !== 200) {
          this.toastr.error(response.error || "The plan could not be updated", "Error")
          return;
        }
        this.toastr.success("The plan was updated successfully", "Success")
        this.sessionStorageService.setItem('typePlan', this.planSelected);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error("An error occurred: ", error)
        this.toastr.error("An error occurred while trying to update the plan", "Error")
      }
    );
  }

}
