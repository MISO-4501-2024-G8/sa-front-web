/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ThirdService } from './third.service';
import { ThirdComponent } from './third.component';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from '../utils/session-storage.service';
import { ThirdProductAllResponse } from '../models/thirdpall_response';
import { ThirdUserCatalogResponse } from '../models/third_catalog_response';

function asyncData<T>(data: T) {
  return of(data).pipe(delay(0));
}

describe('Service: Third', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([ThirdService], (service: ThirdService) => {
    expect(service).toBeTruthy();
  }));
});

describe('Third Component', async () => {
  let component: ThirdComponent;
  let fixture: ComponentFixture<ThirdComponent>;
  let mockService: jasmine.SpyObj<ThirdService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSessionStorageService: jasmine.SpyObj<SessionStorageService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj(['getThirdCatalog']);
    mockToastrService = jasmine.createSpyObj(['success', 'error', 'clear', 'show', 'info']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem','removeItem','setItem']);
    (mockSessionStorageService.getItem as jasmine.Spy).and.returnValue('1');

    TestBed.configureTestingModule({
      declarations: [ThirdComponent],
      providers: [
        { provide: ThirdService, useValue: mockService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
      ]
    });

    const allThirdProducts: ThirdUserCatalogResponse = {
      code: 200,
      message: 'message',
      error: '',
      thirdUsers: [
        {
          "id": "0531a271",
          "email": "andres-8991+11@google.com",
          "name": "Andres Sebas Osorio",
          "phone": "326554478",
          "company_address": "Magnolia 22",
          "company_creation_date": "2021-06-01",
          "contact_name": "Alex Yirsa Durango",
          "company_description": "",
          "company_status": 1,
          "src":""
        }
      ]
    };

    mockService.getThirdCatalog.and.returnValue(asyncData(allThirdProducts));
    //mockService.deleteThirdProduct.and.returnValue(asyncData(deleteResponse));

    fixture = TestBed.createComponent(ThirdComponent);
    component = fixture.componentInstance;
    await fixture.detectChanges();
  });

  it('should initialize the component', async () => {
    const allThirdProducts: ThirdUserCatalogResponse = {
      code: 200,
      message: 'message',
      error: '',
      thirdUsers: [
        {
          "id": "0531a271",
          "email": "andres-8991+11@google.com",
          "name": "Andres Sebas Osorio",
          "phone": "326554478",
          "company_address": "Magnolia 22",
          "company_creation_date": "2021-06-01",
          "contact_name": "Alex Yirsa Durango",
          "company_description": "",
          "company_status": 1,
          "src":""
        }
      ]
    };
    mockService.getThirdCatalog.and.returnValue(asyncData(allThirdProducts));
    await component.ngOnInit();
    expect(mockService.getThirdCatalog).toHaveBeenCalled();
    const emptyProducts = {
      code: 200,
      message: 'message',
      error: '',
      thirdUsers: []
    };
    mockService.getThirdCatalog.and.returnValue(asyncData(emptyProducts));
    await component.ngOnInit();
    component.goToSignUpThird();
    component.goToThirdDetails('1');
  });
});

describe('ThirdProductService', () => {
  let service: ThirdService;
  let httpMock: HttpTestingController;

  const allThirdProducts: ThirdUserCatalogResponse = {
    code: 200,
    message: 'message',
    error: '',
    thirdUsers: [
      {
        "id": "0531a271",
        "email": "andres-8991+11@google.com",
        "name": "Andres Sebas Osorio",
        "phone": "326554478",
        "company_address": "Magnolia 22",
        "company_creation_date": "2021-06-01",
        "contact_name": "Alex Yirsa Durango",
        "company_description": "",
        "company_status": 1,
        "src":""
      }
    ]
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThirdService]
    });

    service = TestBed.get(ThirdService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should getAllTPbyID', () => {
    service.getThirdCatalog().subscribe(response => {
      expect(response).toEqual(allThirdProducts);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}third/third_catalog`);
    expect(req.request.method).toBe('GET');
    req.flush(allThirdProducts); // Provide the mockResponse as the response
  });

});
