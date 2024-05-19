/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './event.service';
import { EventComponent } from './event.component';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from '../utils/session-storage.service';
import { TrainingResponse } from '../models/training_response';
import { SportEvent } from '../models/sport_event';


function asyncData<T>(data: T) {
  return of(data).pipe(delay(0));
}

const allEvents: any = {
  code: 200,
  message: 'message',
  error: '',
  content: [
    {
      "id": "04cae2dc",
      "event_name": "",
      "event_description": "Andres",
      "event_location": "Manizales Caldas Colombia Villa MArcela",
      "event_type": "virtual",
      "sport": "Atletismo",
      "link": "Manizales Caldas Colombia Villa MArcela",
      "event_date": "2024-05-28T14:30:00",
      "createdAt": "2024-05-05T23:50:49",
      "updatedAt": "2024-05-07T00:12:19"
    },
    {
      "id": "16c0eaf0",
      "event_name": "Carrera 5k",
      "event_description": "Carrera de 5K0",
      "event_location": "Bogota",
      "event_type": "virtual",
      "sport": "Atletismo",
      "link": "http://linkreu.edu.aaa",
      "event_date": "2024-05-28T14:30:00",
      "createdAt": "2024-04-26T00:16:35",
      "updatedAt": "2024-05-06T22:17:41"
    },
    {
      "id": "25adcdff",
      "event_name": "ciclismo 22k",
      "event_description": "Ruta de ciclismo 10K",
      "event_location": "Bogota",
      "event_type": "virtual",
      "sport": "Atletismo",
      "link": "http://linkreu.edu.jajaja",
      "event_date": "2024-05-28T14:30:00",
      "createdAt": "2024-05-05T23:43:12",
      "updatedAt": "2024-05-06T22:42:43"
    },
    {
      "id": "3582ba67",
      "event_name": "ciclismo 22k",
      "event_description": "Ruta de ciclismo 10K",
      "event_location": "Bogota",
      "event_type": "virtual",
      "sport": "Ciclismo",
      "link": "http://linkreu.edu",
      "event_date": "2024-05-28T14:30:00",
      "createdAt": "2024-05-10T00:32:33",
      "updatedAt": "2024-05-10T00:32:33"
    }
  ]
};
describe('Service: Event', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));
});

describe('Events Component', async () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let mockService: jasmine.SpyObj<EventService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSessionStorageService: jasmine.SpyObj<SessionStorageService>;
  beforeEach(async () => {
    mockService = jasmine.createSpyObj(['getAllEvents']);
    mockToastrService = jasmine.createSpyObj(['success', 'error', 'clear', 'show', 'info']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'removeItem', 'setItem']);
    (mockSessionStorageService.getItem as jasmine.Spy).and.returnValue('1');

    TestBed.configureTestingModule({
      declarations: [EventComponent],
      providers: [
        { provide: EventService, useValue: mockService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
      ]
    });

    mockService.getAllEvents.and.returnValue(asyncData(allEvents));
    //mockService.deleteThirdProduct.and.returnValue(asyncData(deleteResponse));

    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    await fixture.detectChanges();
  });

  it('should initialize the component', async () => {
    await component.ngOnInit();
    const sportEvent: SportEvent = {
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
    component.goToEvent(sportEvent);
  });
});

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });

    service = TestBed.get(EventService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should getAllEvents', () => {
    service.getAllEvents().subscribe(response => {
      expect(response).toEqual(allEvents);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}eventos`);
    expect(req.request.method).toBe('GET');
    req.flush(allEvents); // Provide the mockResponse as the response
  });
});
