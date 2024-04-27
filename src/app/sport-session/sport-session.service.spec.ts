/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SportSessionService } from './sport-session.service';
import { SportSessionComponent } from './sport-session.component';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from '../utils/session-storage.service';
import { TrainingResponse } from '../models/training_response';
import { SEvent } from '../models/sevent';

function asyncData<T>(data: T) {
  return of(data).pipe(delay(0));
}

describe('Service: SportSession', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SportSessionService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([SportSessionService], (service: SportSessionService) => {
    expect(service).toBeTruthy();
  }));
});

describe('SportSession Component', async () => {
  let component: SportSessionComponent;
  let fixture: ComponentFixture<SportSessionComponent>;
  let mockService: jasmine.SpyObj<SportSessionService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSessionStorageService: jasmine.SpyObj<SessionStorageService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj(['getTrainingSessionsByUserID', 'getAllEvents', 'getAllRoutes', 'createTrainingSession', 'getCombinedData']);
    mockToastrService = jasmine.createSpyObj(['success', 'error', 'clear', 'show', 'info']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'removeItem', 'setItem']);
    (mockSessionStorageService.getItem as jasmine.Spy).and.returnValue('1');

    TestBed.configureTestingModule({
      declarations: [SportSessionComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SportSessionService, useValue: mockService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
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
        }
      ],
      "message": "Se encontró la sesión de entrenamiento exitosamente",
      "code": 200,
      "error": ""
    }

    const responseGetAllEvents = {
      "message": "OK",
      "content": [
        {
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
        {
          "id": "3addf716",
          "event_name": "ciclismo 10k",
          "event_description": "Ruta de ciclismo 10K",
          "event_location": "Bogota",
          "event_type": "virtual",
          "sport": "Ciclismo",
          "link": "http://linkreu.edu",
          "event_date": "2024-05-28T14:30:00",
          "createdAt": "2024-04-25T18:47:26",
          "updatedAt": "2024-04-25T18:47:26"
        }
      ],
      "code": 200,
      "error": ""
    }

    const responseGetAllRoutes = {
      "message": "OK",
      "content": [
        {
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
        {
          "id": "5b3deeeb",
          "route_name": "Carrera de 3K Universitaria",
          "route_description": "Carrera de practica 3K Universitaria",
          "route_location_A": "PUJ",
          "route_location_B": "Andes",
          "route_latlon_A": "4.628478706528637, -74.06472730115881",
          "route_latlon_B": "4.601489371017458, -74.06612808714058",
          "route_type": "virtual",
          "sport": "Atletismo",
          "link": "http://linkreu.edu",
          "route_date": "2024-05-29T14:30:00",
          "createdAt": "2024-04-26T00:17:02",
          "updatedAt": "2024-04-26T00:20:29"
        }
      ],
      "code": 200,
      "error": ""
    }
    const responseCreateTrainingSession = {
      "message": "Sesion de Entrenamiento creada",
      "code": 201,
      "content": null,
      "error": ""
    }
    mockService.getTrainingSessionsByUserID.and.returnValue(asyncData(responseGetTrainingSessionsByUserID));
    mockService.getAllEvents.and.returnValue(asyncData(responseGetAllEvents));
    mockService.getAllRoutes.and.returnValue(asyncData(responseGetAllRoutes));
    mockService.createTrainingSession.and.returnValue(asyncData(responseCreateTrainingSession));
    mockService.getCombinedData.and.returnValue(asyncData([responseGetAllEvents, responseGetAllRoutes, responseGetTrainingSessionsByUserID]));

    fixture = TestBed.createComponent(SportSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get training sessions by user id', () => {
    const responseGetTrainingSessionsByUserID_2 = {
      "content": [],
      "message": "Se encontró la sesión de entrenamiento exitosamente",
      "code": 200,
      "error": ""
    }
    mockService.getTrainingSessionsByUserID.and.returnValue(asyncData(responseGetTrainingSessionsByUserID_2));
    component.ngOnInit();
    const mockCard: SEvent = {
      id: '1',
      event_name: 'Carrera 5k',
      event_description: 'Carrera de 5K',
      event_location: 'Bogota',
      event_type: 'virtual',
      event_date: '2024-05-28T14:30:00',
      map_link: null,
      sport: 'Atletismo',
      link: 'http://linkreu.edu',
      type: 'evento',
      selected: false,
      programada: false,
      imageUrl: '../../assets/runing-session.jpeg'
    }
    const mockCard2: SEvent = {
      id: '2',
      event_name: 'Carrera 5k',
      event_description: 'Carrera de 5K',
      event_location: 'Bogota',
      event_type: 'virtual',
      event_date: '2024-05-28T14:30:00',
      map_link: null,
      sport: 'Atletismo',
      link: 'http://linkreu.edu',
      type: 'evento',
      selected: false,
      programada: false,
      imageUrl: '../../assets/runing-session.jpeg'
    }
    component.setBaseCards([
      mockCard,
      mockCard2
    ])
    component.resetCards();
    component.selectCard(mockCard);
    component.deselectCard({
      id: '1',
      event_name: 'Carrera 5k',
      event_description: 'Carrera de 5K',
      event_location: 'Bogota',
      event_type: 'virtual',
      event_date: '2024-05-28T14:30:00',
      map_link: null,
      sport: 'Atletismo',
      link: 'http://linkreu.edu',
      type: 'evento',
      selected: false,
      programada: false,
      imageUrl: '../../assets/runing-session.jpeg'
    })
    component.onSelection(Date.now());
    component.setSessionType('virtual');
    component.setSportType('Atletismo');
    component.createTrainingSessions();
    component.limpiarFiltros();
    component.cancelAction();
  });

  it('should return no events', () => {
    const responseGetTrainingSessionsByUserID = {
      "content": [],
      "message": "Se encontró la sesión de entrenamiento exitosamente",
      "code": 200,
      "error": ""
    }

    const responseGetAllEvents = {
      "message": "OK",
      "content": [],
      "code": 200,
      "error": ""
    }

    const responseGetAllRoutes = {
      "message": "OK",
      "content": [],
      "code": 200,
      "error": ""
    }
    mockService.getTrainingSessionsByUserID.and.returnValue(asyncData(responseGetTrainingSessionsByUserID));
    mockService.getAllEvents.and.returnValue(asyncData(responseGetAllEvents));
    mockService.getAllRoutes.and.returnValue(asyncData(responseGetAllRoutes));
    mockService.getCombinedData.and.returnValue(asyncData([responseGetAllEvents, responseGetAllRoutes, responseGetTrainingSessionsByUserID]));
    component.ngOnInit();
  });
});

describe('SportSession Service', () => {
  let service: SportSessionService;
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
      }
    ],
    "message": "Se encontró la sesión de entrenamiento exitosamente",
    "code": 200,
    "error": ""
  }

  const responseGetAllEvents = {
    "message": "OK",
    "content": [
      {
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
      {
        "id": "3addf716",
        "event_name": "ciclismo 10k",
        "event_description": "Ruta de ciclismo 10K",
        "event_location": "Bogota",
        "event_type": "virtual",
        "sport": "Ciclismo",
        "link": "http://linkreu.edu",
        "event_date": "2024-05-28T14:30:00",
        "createdAt": "2024-04-25T18:47:26",
        "updatedAt": "2024-04-25T18:47:26"
      }
    ],
    "code": 200,
    "error": ""
  }

  const responseGetAllRoutes = {
    "message": "OK",
    "content": [
      {
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
      {
        "id": "5b3deeeb",
        "route_name": "Carrera de 3K Universitaria",
        "route_description": "Carrera de practica 3K Universitaria",
        "route_location_A": "PUJ",
        "route_location_B": "Andes",
        "route_latlon_A": "4.628478706528637, -74.06472730115881",
        "route_latlon_B": "4.601489371017458, -74.06612808714058",
        "route_type": "virtual",
        "sport": "Atletismo",
        "link": "http://linkreu.edu",
        "route_date": "2024-05-29T14:30:00",
        "createdAt": "2024-04-26T00:17:02",
        "updatedAt": "2024-04-26T00:20:29"
      }
    ],
    "code": 200,
    "error": ""
  }
  const responseCreateTrainingSession = {
    "message": "Sesion de Entrenamiento creada",
    "code": 201,
    "content": null,
    "error": ""
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SportSessionService]
    });

    service = TestBed.get(SportSessionService);
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

  it('should getAllEvents', () => {
    service.getAllEvents().subscribe(response => {
      expect(response).toEqual(responseGetAllEvents);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}eventos`);
    expect(req.request.method).toBe('GET');
    req.flush(responseGetAllEvents); // Provide the mockResponse as the response
  });

  it('should getAllRoutes', () => {
    service.getAllRoutes().subscribe(response => {
      expect(response).toEqual(responseGetAllRoutes);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}rutas`);
    expect(req.request.method).toBe('GET');
    req.flush(responseGetAllRoutes); // Provide the mockResponse as the response
  });

  it('should getCombinedData', () => {
    const mockResponses = [responseGetAllEvents, responseGetAllRoutes, responseGetTrainingSessionsByUserID];

    service.getCombinedData("1").subscribe(response => {
      expect(response).toEqual(mockResponses);
    });

    const req1 = httpMock.expectOne(`${environment.baseUrl}eventos`);
    expect(req1.request.method).toBe('GET');
    req1.flush(responseGetAllEvents);

    const req2 = httpMock.expectOne(`${environment.baseUrl}rutas`);
    expect(req2.request.method).toBe('GET');
    req2.flush(responseGetAllRoutes);

    const req3 = httpMock.expectOne(`${environment.baseUrl}training_session/1`);
    expect(req3.request.method).toBe('GET');
    req3.flush(responseGetTrainingSessionsByUserID);
  });

  it('should createTrainingSession', () => {
    service.createTrainingSession({}).subscribe(response => {
      expect(response).toEqual(responseCreateTrainingSession);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}training_session`);
    expect(req.request.method).toBe('POST');
    req.flush(responseCreateTrainingSession); // Provide the mockResponse as the response
  });

});
