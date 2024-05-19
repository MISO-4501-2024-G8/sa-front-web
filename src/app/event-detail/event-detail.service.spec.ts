/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventDetailService } from './event-detail.service';
import { EventDetailComponent } from './event-detail.component';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from '../utils/session-storage.service';
import { SportEvent } from '../models/sport_event';

function asyncData<T>(data: T) {
  return of(data).pipe(delay(0));
}

const eventData: any = {
  "message": "OK",
  "content": {
      "id": "a129351d",
      "event_name": "Evento de prueba",
      "event_description": "Evento a realizarse en bogota para una carrera ciclistica",
      "event_location": "Bogota",
      "event_type": "virtual",
      "sport": "Ciclismo",
      "link": "",
      "event_date": "2024-05-28T14:30:00",
      "createdAt": "2024-05-07T00:13:42",
      "updatedAt": "2024-05-07T00:13:42",
  },
  "code": 200
}

const trainingSessionsData: any = {
  "content": [
      {
          "id": "0593ad72",
          "id_sport_user": "e2f75148",
          "id_event": "35407c4f",
          "event_category": "ruta",
          "sport_type": "Ciclismo",
          "session_date": "2024-05-28T14:30:00",
          "createdAt": "2024-05-10T04:23:01",
          "updatedAt": "2024-05-10T04:23:01"
      },
      {
          "id": "2fde06a2",
          "id_sport_user": "e2f75148",
          "id_event": "08cef4b3",
          "event_category": "ruta",
          "sport_type": "Ciclismo",
          "session_date": "2024-05-29T14:30:00",
          "createdAt": "2024-05-13T03:29:52",
          "updatedAt": "2024-05-13T03:29:52"
      },
      {
          "id": "44c0d041",
          "id_sport_user": "e2f75148",
          "id_event": "59785783",
          "event_category": "evento",
          "sport_type": "Ciclismo",
          "session_date": "2024-05-28T14:30:00",
          "createdAt": "2024-05-13T15:25:47",
          "updatedAt": "2024-05-13T15:25:47"
      },
      {
          "id": "4712baf3",
          "id_sport_user": "e2f75148",
          "id_event": "ab7c6299",
          "event_category": "evento",
          "sport_type": "Ciclismo",
          "session_date": "2024-05-28T14:30:00",
          "createdAt": "2024-05-13T03:41:20",
          "updatedAt": "2024-05-13T03:41:20"
      },
      {
          "id": "536254a0",
          "id_sport_user": "e2f75148",
          "id_event": "a129351d",
          "event_category": "evento",
          "sport_type": "Ciclismo",
          "session_date": "2024-05-28T14:30:00",
          "createdAt": "2024-05-10T02:16:30",
          "updatedAt": "2024-05-10T02:16:30"
      },
      {
          "id": "54167aaa",
          "id_sport_user": "e2f75148",
          "id_event": "3058abef",
          "event_category": "plan_training",
          "sport_type": "Atletismo",
          "session_date": "2024-05-28T14:30:00",
          "createdAt": "2024-05-18T02:28:15",
          "updatedAt": "2024-05-18T02:28:15"
      },
      {
          "id": "5d7cd00f",
          "id_sport_user": "e2f75148",
          "id_event": "5b3deeeb",
          "event_category": "ruta",
          "sport_type": "Atletismo",
          "session_date": "2024-05-29T14:30:00",
          "createdAt": "2024-05-10T04:26:25",
          "updatedAt": "2024-05-10T04:26:25"
      },
      {
          "id": "646131d5",
          "id_sport_user": "e2f75148",
          "id_event": "59785783",
          "event_category": "evento",
          "sport_type": "Ciclismo",
          "session_date": "2024-05-28T14:30:00",
          "createdAt": "2024-05-13T03:23:54",
          "updatedAt": "2024-05-13T03:23:54"
      },
      {
          "id": "ac13b211",
          "id_sport_user": "e2f75148",
          "id_event": "5dbe1745",
          "event_category": "plan_training",
          "sport_type": "Atletismo",
          "session_date": "2024-05-17T21:33:54",
          "createdAt": "2024-05-18T02:33:54",
          "updatedAt": "2024-05-18T02:33:54"
      },
      {
          "id": "b4408d7e",
          "id_sport_user": "e2f75148",
          "id_event": "ae18e584",
          "event_category": "plan_training",
          "sport_type": "Atletismo",
          "session_date": "2024-05-28T14:30:00",
          "createdAt": "2024-05-17T02:44:17",
          "updatedAt": "2024-05-17T02:44:17"
      },
      {
          "id": "c0b7bd59",
          "id_sport_user": "e2f75148",
          "id_event": "16c0eaf0",
          "event_category": "evento",
          "sport_type": "Atletismo",
          "session_date": "2024-05-28T14:30:00",
          "createdAt": "2024-05-19T05:59:09",
          "updatedAt": "2024-05-19T05:59:09"
      },
      {
          "id": "e8787f9b",
          "id_sport_user": "e2f75148",
          "id_event": "5b3deeeb",
          "event_category": "ruta",
          "sport_type": "Atletismo",
          "session_date": "2024-05-29T14:30:00",
          "createdAt": "2024-05-13T03:40:16",
          "updatedAt": "2024-05-13T03:40:16"
      }
  ],
  "message": "Se encontró la sesión de entrenamiento exitosamente",
  "code": 200
}

const createTrainingSessionData: any = {
  "message": "Sesion de Entrenamiento creada",
  "code": 201,
  "content": {
      "id": "54167aaa",
      "id_sport_user": "e2f75148",
      "id_event": "3058abef",
      "event_category": "plan_training",
      "sport_type": "Atletismo",
      "session_date": "2024-05-28T14:30:00",
      "createdAt": "2024-05-18T02:28:15",
      "updatedAt": "2024-05-18T02:28:15"
  }
}

describe('Service: EventDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventDetailService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([EventDetailService], (service: EventDetailService) => {
    expect(service).toBeTruthy();
  }));
});

describe('Detail-Event Component', async () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;
  let mockService: jasmine.SpyObj<EventDetailService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSessionStorageService: jasmine.SpyObj<SessionStorageService>;
  beforeEach(async () => {
    mockService = jasmine.createSpyObj(['getEventDetail','getTrainingSessionsByUserID','createTrainingSession']);
    mockToastrService = jasmine.createSpyObj(['success', 'error', 'clear', 'show', 'info']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'removeItem', 'setItem']);
    (mockSessionStorageService.getItem as jasmine.Spy).and.returnValue('1');

    TestBed.configureTestingModule({
      declarations: [EventDetailComponent],
      providers: [
        { provide: EventDetailService, useValue: mockService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
      ]
    });

    mockService.getEventDetail.and.returnValue(asyncData(eventData));
    mockService.getTrainingSessionsByUserID.and.returnValue(asyncData(trainingSessionsData));
    mockService.createTrainingSession.and.returnValue(asyncData(createTrainingSessionData));

    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    await fixture.detectChanges();
  });

  it('should initialize the component', async () => {
    await component.ngOnInit();
    component.goEvents();
    let sportEvent: SportEvent = {
      "id": "3582ba67",
      "event_name": "ciclismo 22k",
      "event_description": "Ruta de ciclismo 10K",
      "event_location": "Bogota",
      "event_type": "virtual",
      "sport": "Ciclismo",
      "link": "http://linkreu.edu",
      "event_date": "2024-05-28T14:30:00",
      "src": ""
    }
    component.createTrainingSessions(sportEvent);
    component.getRandomImageSource();
  });
});

describe('Detail-Event Service', () => {
  let service: EventDetailService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventDetailService]
    });

    service = TestBed.get(EventDetailService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should getEventDetail', () => {
    service.getEventDetail("1").subscribe(response => {
      expect(response).toEqual(eventData);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}eventos/1`);
    expect(req.request.method).toBe('GET');
    req.flush(eventData); // Provide the mockResponse as the response
  });

  it('should getTrainingSessionsByUserID', () => {
    service.getTrainingSessionsByUserID("1").subscribe(response => {
      expect(response).toEqual(trainingSessionsData);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}training_session/1`);
    expect(req.request.method).toBe('GET');
    req.flush(trainingSessionsData); // Provide the mockResponse as the response
  });

  it('should createTrainingSession', () => {

    const dataCreate = {
      "id_sport_user": "e2f75148",
      "id_event": "3058abef",
      "event_category": "plan_training",
      "sport_type": "Atletismo",
      "session_date": "2024-05-28 14:30:00"
  }

    service.createTrainingSession(dataCreate).subscribe(response => {
      expect(response).toEqual(createTrainingSessionData);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}training_session`);
    expect(req.request.method).toBe('POST');
    req.flush(createTrainingSessionData); // Provide the mockResponse as the response
  });
});


