/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MySessionService } from './my-session.service';
import { MySessionComponent } from './my-session.component';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from '../utils/session-storage.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

function asyncData<T>(data: T) {
  return of(data).pipe(delay(0));
}

describe('Service: MySession', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MySessionService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([MySessionService], (service: MySessionService) => {
    expect(service).toBeTruthy();
  }));
});

describe('SportSession Component', async () => {
  let component: MySessionComponent;
  let fixture: ComponentFixture<MySessionComponent>;
  let mockService: jasmine.SpyObj<MySessionService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSessionStorageService: jasmine.SpyObj<SessionStorageService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj(['getTrainingSessionsByUserID', 'getEventByID', 'getRouteByID', 'deleteTrainingSession']);
    mockToastrService = jasmine.createSpyObj(['success', 'error', 'clear', 'show', 'info']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'removeItem', 'setItem']);
    (mockSessionStorageService.getItem as jasmine.Spy).and.returnValue('1');

    TestBed.configureTestingModule({
      declarations: [MySessionComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MySessionService, useValue: mockService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        FormBuilder,
      ]
    }).compileComponents();
    const responseGetTrainingSessionsByUserID = {
      "content": [
        {
          "id": "236f1016",
          "id_sport_user": "e2f75148",
          "id_event": "59785783",
          "event_category": "evento",
          "sport_type": "Atletismo",
          "session_date": "2024-05-28T14:30:00",
          "createdAt": "2024-04-25T01:03:22",
          "updatedAt": "2024-04-25T01:12:56"
        },
        {
          "id": "3508f926",
          "id_sport_user": "e2f75148",
          "id_event": "16c0eaf0",
          "event_category": "evento",
          "sport_type": "Atletismo",
          "session_date": "2024-05-28T00:00:00",
          "createdAt": "2024-04-26T03:13:24",
          "updatedAt": "2024-04-26T03:13:24"
        },
        {
          "id": "3508f944",
          "id_sport_user": "e2f75148",
          "id_event": "16c0eaf0",
          "event_category": "ruta",
          "sport_type": "Atletismo",
          "session_date": "2024-05-28T00:00:00",
          "createdAt": "2024-04-26T03:13:24",
          "updatedAt": "2024-04-26T03:13:24"
        }
      ],
      "message": "Se encontró la sesión de entrenamiento exitosamente",
      "code": 200,
      "error": ""
    }

    const responseGetEventByID = {
      "message": "OK",
      "content": {
        "id": "16c0eaf0",
        "event_name": "Carrera 5k",
        "event_description": "Carrera de 5K",
        "event_location": "Bogota",
        "event_type": "virtual",
        "sport": "Atletismo",
        "link": "http://linkreu.edu",
        "event_date": "2024-05-28T14:30:00",
        "createdAt": "2024-04-26T00:16:35",
        "updatedAt": "2024-04-26T00:19:33"
      },
      "code": 200,
      "error": ""
    }

    const responseGetRouteByID = {
      "message": "OK",
      "content": {
        "id": "08cef4b3",
        "route_name": "Ruta 5K Universitaria",
        "route_description": "Ruta de practica 5K Universitaria",
        "route_location_A": "PUJ",
        "route_location_B": "Andes",
        "route_latlon_A": "4.628478706528637, -74.06472730115881",
        "route_latlon_B": "4.601489371017458, -74.06612808714058",
        "route_type": "presencial",
        "sport": "Ciclismo",
        "link": "http://linkreu.edu",
        "route_date": "2024-05-29T14:30:00",
        "createdAt": "2024-04-26T01:54:38",
        "updatedAt": "2024-04-26T01:54:38"
      },
      "code": 200,
      "error": ""
    }

    const responseDeleteTrainingSession = {
      "message": "Sesión de Entrenamiento eliminada",
      "code": 200,
      "error": "",
      "content": null
    }

    mockService.getTrainingSessionsByUserID.and.returnValue(asyncData(responseGetTrainingSessionsByUserID));
    mockService.getEventByID.and.returnValue(asyncData(responseGetEventByID));
    mockService.getRouteByID.and.returnValue(asyncData(responseGetRouteByID));
    mockService.deleteTrainingSession.and.returnValue(asyncData(responseDeleteTrainingSession));

    fixture = TestBed.createComponent(MySessionComponent);
    component = fixture.componentInstance;
    component.filterForm = new FormGroup({
      initialDate: new FormControl(''),
      finalDate: new FormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get training sessions by user id', () => {
    component.ngOnInit();
    component.filterTrainingSessions();
    component.clearFilter();
    const mockEvent = {
      training_session: {
        id: "",
        id_sport_user: "",
        id_event: "",
        event_category: "",
        sport_type: "",
        session_date: "",
      },
      event: {
        id: "",
        event_name: "",
        event_description: "",
        event_location: "",
        event_type: "",
        sport: "",
        link: "",
        event_date: "",
      },
      route: null
    }
    const mockRoute = {
      training_session: {
        id: "",
        id_sport_user: "",
        id_event: "",
        event_category: "",
        sport_type: "",
        session_date: "",
      },
      event: null,
      route: {
        id: "",
        route_name: "",
        route_description: "",
        route_location_A: "123",
        route_location_B: "123",
        route_latlon_A: "123",
        route_latlon_B: "123",
        route_type: "",
        sport: "Ciclismo",
        link: "",
        route_date: "",
      }
    }
    const mockRoute2 = {
      training_session: {
        id: "",
        id_sport_user: "",
        id_event: "",
        event_category: "",
        sport_type: "",
        session_date: "",
      },
      event: null,
      route: {
        id: "",
        route_name: "",
        route_description: "",
        route_location_A: "123",
        route_location_B: "123",
        route_latlon_A: "123",
        route_latlon_B: "123",
        route_type: "",
        sport: "Atletismo",
        link: "",
        route_date: "",
      }
    }
    component.infoTrainingSession(mockEvent);
    component.infoTrainingSession(mockRoute);
    component.infoTrainingSession(mockRoute2);
    component.deleteTrainingSession('1');
    component.returnToSession();
  });

  it('should handle errors', () => {
    const responseDeleteTrainingSessionError = {
      "message": "Error al eliminar la sesión de entrenamiento",
      "code": 400,
      "error": "Error",
      "content": null
    }
    mockService.deleteTrainingSession.and.returnValue(throwError(responseDeleteTrainingSessionError));
    component.deleteTrainingSession('1');
    const responseGetTrainingSessionsByUserIDError = {
      "message": "Error al obtener la sesión de entrenamiento",
      "code": 400,
      "error": "Error",
      "content": null
    }
    const responseGetRouteByIDError = {
      "message": "Error al obtener la ruta",
      "code": 400,
      "error": "Error",
      "content": null
    }
    const responseGetEventByIDError = {
      "message": "Error al obtener el evento",
      "code": 400,
      "error": "Error",
      "content": null
    }
    mockService.getRouteByID.and.returnValue(throwError(responseGetRouteByIDError));
    component.ngOnInit();
    mockService.getEventByID.and.returnValue(throwError(responseGetEventByIDError));
    component.ngOnInit();
    mockService.getTrainingSessionsByUserID.and.returnValue(throwError(responseGetTrainingSessionsByUserIDError));
    component.ngOnInit();
  });
});

describe('Mysession Service', () => {
  let service: MySessionService;
  let httpMock: HttpTestingController;
  const responseGetTrainingSessionsByUserID = {
    "content": [
      {
        "id": "236f1016",
        "id_sport_user": "e2f75148",
        "id_event": "59785783",
        "event_category": "evento",
        "sport_type": "Atletismo",
        "session_date": "2024-05-28T14:30:00",
        "createdAt": "2024-04-25T01:03:22",
        "updatedAt": "2024-04-25T01:12:56"
      },
      {
        "id": "3508f926",
        "id_sport_user": "e2f75148",
        "id_event": "16c0eaf0",
        "event_category": "evento",
        "sport_type": "Atletismo",
        "session_date": "2024-05-28T00:00:00",
        "createdAt": "2024-04-26T03:13:24",
        "updatedAt": "2024-04-26T03:13:24"
      },
      {
        "id": "3508f944",
        "id_sport_user": "e2f75148",
        "id_event": "16c0eaf0",
        "event_category": "ruta",
        "sport_type": "Atletismo",
        "session_date": "2024-05-28T00:00:00",
        "createdAt": "2024-04-26T03:13:24",
        "updatedAt": "2024-04-26T03:13:24"
      }
    ],
    "message": "Se encontró la sesión de entrenamiento exitosamente",
    "code": 200,
    "error": ""
  }

  const responseGetEventByID = {
    "message": "OK",
    "content": {
      "id": "16c0eaf0",
      "event_name": "Carrera 5k",
      "event_description": "Carrera de 5K",
      "event_location": "Bogota",
      "event_type": "virtual",
      "sport": "Atletismo",
      "link": "http://linkreu.edu",
      "event_date": "2024-05-28T14:30:00",
      "createdAt": "2024-04-26T00:16:35",
      "updatedAt": "2024-04-26T00:19:33"
    },
    "code": 200,
    "error": ""
  }

  const responseGetRouteByID = {
    "message": "OK",
    "content": {
      "id": "08cef4b3",
      "route_name": "Ruta 5K Universitaria",
      "route_description": "Ruta de practica 5K Universitaria",
      "route_location_A": "PUJ",
      "route_location_B": "Andes",
      "route_latlon_A": "4.628478706528637, -74.06472730115881",
      "route_latlon_B": "4.601489371017458, -74.06612808714058",
      "route_type": "presencial",
      "sport": "Ciclismo",
      "link": "http://linkreu.edu",
      "route_date": "2024-05-29T14:30:00",
      "createdAt": "2024-04-26T01:54:38",
      "updatedAt": "2024-04-26T01:54:38"
    },
    "code": 200,
    "error": ""
  }

  const responseDeleteTrainingSession = {
    "message": "Sesión de Entrenamiento eliminada",
    "code": 200,
    "error": "",
    "content": null
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MySessionService]
    });

    service = TestBed.get(MySessionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should getTrainingSessionsByUserID', () => {
    service.getTrainingSessionsByUserID("1").subscribe(response => {
      expect(response).toEqual(responseGetTrainingSessionsByUserID);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}training_session/1`);
    expect(req.request.method).toBe('GET');
    req.flush(responseGetTrainingSessionsByUserID); // Provide the mockResponse as the response
  });

  it('should getEventByID', () => {
    service.getEventByID("1").subscribe(response => {
      expect(response).toEqual(responseGetEventByID);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}eventos/1`);
    expect(req.request.method).toBe('GET');
    req.flush(responseGetEventByID); // Provide the mockResponse as the response
  });

  it('should getRouteByID', () => {
    service.getRouteByID("1").subscribe(response => {
      expect(response).toEqual(responseGetRouteByID);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}rutas/1`);
    expect(req.request.method).toBe('GET');
    req.flush(responseGetRouteByID); // Provide the mockResponse as the response
  });

  it('should deleteTrainingSession', () => {
    service.deleteTrainingSession("1").subscribe(response => {
      expect(response).toEqual(responseDeleteTrainingSession);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}training_session/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(responseDeleteTrainingSession); // Provide the mockResponse as the response
  });
});
