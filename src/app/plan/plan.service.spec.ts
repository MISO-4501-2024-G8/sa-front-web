/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlanService } from './plan.service';
import { PlanComponent } from './plan.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { PlanResponse } from '../models/plan_response';
import { PlanUpdateResponse } from '../models/plan_upd_response';

describe('Service: Plan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlanService]
    });
  });

  it('should ...', inject([PlanService], (service: PlanService) => {
    expect(service).toBeTruthy();
  }));
});

describe('PlanComponent', () => {
  let component: PlanComponent;
  let fixture: ComponentFixture<PlanComponent>;
  let mockPlanService: jasmine.SpyObj<PlanService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockPlanService = jasmine.createSpyObj(['getAllPlanInfo', 'updatePlan']);
    mockToastrService = jasmine.createSpyObj(['success', 'error', 'clear', 'show']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [PlanComponent],
      providers: [
        { provide: PlanService, useValue: mockPlanService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter }
      ]
    });
    const updatePlanResponse: PlanUpdateResponse = {
      code: 200,
      message: 'Plan actualizado correctamente',
      plan: 'basico',
      error: ''
    };
    const getAllPlanInfoResponse: PlanResponse[] = [
      {
        "id": "38a3f94e",
        "name": "Plan Premium",
        "typePlan": "premium",
        "startDate": "2024-02-02T05:00:00.000Z",
        "endDate": "2024-12-31T05:00:00.000Z",
        "value": 200,
        "createdAt": "2024-04-19T02:41:56.000Z",
        "updatedAt": "2024-04-19T02:41:56.000Z",
        "monitoreoTiempoReal": true,
        "alertasRiesgo": false,
        "comunicacionEntrenador": true,
        "sesionesVirtuales": 2,
        "masajes": true,
        "cuidadoPosEjercicio": true,
        "features": [
          {
            "id": "12f8fd4e",
            "feature": "Esto es una desc de un feature"
          },
          {
            "id": "c7e4951d",
            "feature": "Esto es una desc de un feature"
          }
        ]
      }
    ];
    mockPlanService.updatePlan.and.returnValue(of(updatePlanResponse));
    mockPlanService.getAllPlanInfo.and.returnValue(of(getAllPlanInfoResponse));

    fixture = TestBed.createComponent(PlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should change plan and navigate to /home on successful change - 1', () => {
    component.token = 'token';
    component.planSelected = 'basico';
    component.idUser = 'userid';
    component.updateUserPlan();
    expect(mockToastrService.success).toHaveBeenCalledWith('The plan was updated successfully', 'Success');
  });

  it('should handle error when starting the component', () => {
    mockPlanService.getAllPlanInfo.and.returnValue(throwError('Error'));
    component.ngOnInit();
    expect(mockToastrService.error).toHaveBeenCalledWith('An error occurred while trying to get the plans', 'Error');
  });

  it('should change plan', () => {
    component.seleccionarPlan('basico');
    expect(component.planSelected).toBe('basico');
  });

  it('should check token and plan before updating', () => {
    component.token = undefined;
    component.updateUserPlan();
    expect(mockToastrService.error).toHaveBeenCalledWith('You must login to update your plan', 'Error');
  });

  it('should check plan before updating', () => {
    component.token = 'token';
    component.planSelected = undefined;
    component.updateUserPlan();
    expect(mockToastrService.error).toHaveBeenCalledWith('You must select a plan to update', 'Error');
  });

  it('should handle code 500', () => {
    component.token = 'token';
    component.planSelected = 'basico';
    component.idUser = 'userid';
    let updatePlanResponse: PlanUpdateResponse = {
      code: 500,
      message: 'Error',
      plan: '',
      error: 'Error'
    };
    mockPlanService.updatePlan.and.returnValue(of(updatePlanResponse));
    component.updateUserPlan();
    expect(mockToastrService.error).toHaveBeenCalledWith('Error', 'Error');
  });
  it('should handle error inside', () => {
    component.token = 'token';
    component.planSelected = 'basico';
    component.idUser = 'userid';
    mockPlanService.updatePlan.and.returnValue(throwError('error'));
    component.updateUserPlan();
    expect(mockToastrService.error).toHaveBeenCalledWith('An error occurred while trying to update the plan', 'Error');
  });
});

describe('PlanService', () => {
  let service: PlanService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlanService]
    });
    service = TestBed.inject(PlanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all plans', () => {
    const plans: PlanResponse[] = [
      {
        "id": "38a3f94e",
        "name": "Plan Premium",
        "typePlan": "premium",
        "startDate": "2024-02-02T05:00:00.000Z",
        "endDate": "2024-12-31T05:00:00.000Z",
        "value": 200,
        "createdAt": "2024-04-19T02:41:56.000Z",
        "updatedAt": "2024-04-19T02:41:56.000Z",
        "monitoreoTiempoReal": true,
        "alertasRiesgo": false,
        "comunicacionEntrenador": true,
        "sesionesVirtuales": 2,
        "masajes": true,
        "cuidadoPosEjercicio": true,
        "features": [
          {
            "id": "12f8fd4e",
            "feature": "Esto es una desc de un feature"
          },
          {
            "id": "c7e4951d",
            "feature": "Esto es una desc de un feature"
          }
        ]
      }
    ];
    service.getAllPlanInfo().subscribe(response => {
      expect(response).toEqual(plans);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}plans/allplans`);
    expect(req.request.method).toBe('GET');
    req.flush(plans);
  });

  it('should get plan info', () => {
    const plan: PlanResponse = {
      "id": "38a3f94e",
      "name": "Plan Premium",
      "typePlan": "premium",
      "startDate": "2024-02-02T05:00:00.000Z",
      "endDate": "2024-12-31T05:00:00.000Z",
      "value": 200,
      "createdAt": "2024-04-19T02:41:56.000Z",
      "updatedAt": "2024-04-19T02:41:56.000Z",
      "monitoreoTiempoReal": true,
      "alertasRiesgo": false,
      "comunicacionEntrenador": true,
      "sesionesVirtuales": 2,
      "masajes": true,
      "cuidadoPosEjercicio": true,
      "features": [
        {
          "id": "12f8fd4e",
          "feature": "Esto es una desc de un feature"
        },
        {
          "id": "c7e4951d",
          "feature": "Esto es una desc de un feature"
        }
      ]
    };
    service.getPlanInfo('premium').subscribe(response => {
      expect(response).toEqual(plan);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}plans/allplans/premium`);
    expect(req.request.method).toBe('GET');
    req.flush(plan);
  });

  it('should update plan', () => {
    const updatePlanResponse: PlanUpdateResponse = {
      code: 200,
      message: 'Plan actualizado correctamente',
      plan: 'basico',
      error: ''
    };
    service.updatePlan('basico', 'token', 'userid').subscribe(response => {
      expect(response).toEqual(updatePlanResponse);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}register/typePlanUser/userid`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatePlanResponse);
  });
});
