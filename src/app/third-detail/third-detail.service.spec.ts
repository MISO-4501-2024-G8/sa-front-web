/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ThirdDetailService } from './third-detail.service';
import { ThirdDetailComponent } from './third-detail.component';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from '../utils/session-storage.service';
import { ThirdProductAllResponse } from '../models/thirdpall_response';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThirdProduct } from '../models/thirdproduct';

function asyncData<T>(data: T) {
  return of(data).pipe(delay(0));
}

describe('Service: ThirdDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdDetailService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([ThirdDetailService], (service: ThirdDetailService) => {
    expect(service).toBeTruthy();
  }));
});

describe('ThirdProduct Component', async () => {
  let component: ThirdDetailComponent;
  let fixture: ComponentFixture<ThirdDetailComponent>;
  let mockService: jasmine.SpyObj<ThirdDetailService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSessionStorageService: jasmine.SpyObj<SessionStorageService>;

  const allThirdProducts: ThirdProductAllResponse = {
    code: 200,
    message: 'message',
    error: '',
    allProducts: [
      {
        message: "message",
        code: 200,
        error: "",
        productType: "trainer",
        thirdProduct: {
          id: "36692436",
          id_third_user: "1",
          name: "Entrenador XX",
          description: "Ofrece servicios de entrenamiento personalizado y muy baratos",
          value: 40,
          typeProduct: "trainer",
          representative_phone: "3223467890",
          address: "Calle 123",
          availability: []
        },
        trainer: {},
        doctor: {},
        availability: [
          {
            day: "martes",
            time_start: 11,
            time_end: 15,
          }
        ]
      },
    ]
  };

  beforeEach(async () => {
    mockService = jasmine.createSpyObj(['getThirdServices', 'createCustomerService']);
    mockToastrService = jasmine.createSpyObj(['success', 'error', 'clear', 'show', 'info']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'setItem', 'removeItem']);
    (mockSessionStorageService.getItem as jasmine.Spy).and.returnValue('1');

    TestBed.configureTestingModule({
      declarations: [ThirdDetailComponent],
      providers: [
        { provide: ThirdDetailService, useValue: mockService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        FormBuilder
      ]
    });

    mockService.getThirdServices.and.returnValue(asyncData(allThirdProducts));

    fixture = TestBed.createComponent(ThirdDetailComponent);
    component = fixture.componentInstance;
    component.custserviceForm = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      user_address: new FormControl(''),
      user_neighborhood: new FormControl(''),
      user_phone: new FormControl(''),
      service_date: new FormControl('')
    });
    await fixture.detectChanges();

  });

  it('should initialize the component', async () => {
    const allThirdProducts: ThirdProductAllResponse = {
      code: 200,
      message: 'message',
      error: '',
      allProducts: [
        {
          message: "message",
          code: 200,
          error: "",
          productType: "trainer",
          thirdProduct: {
            id: "36692436",
            id_third_user: "1",
            name: "Entrenador XX",
            description: "Ofrece servicios de entrenamiento personalizado y muy baratos",
            value: 40,
            typeProduct: "trainer",
            representative_phone: "3223467890",
            address: "Calle 123",
            availability: []
          },
          trainer: {},
          doctor: {},
          availability: [
            {
              day: "martes",
              time_start: 11,
              time_end: 15,
            }
          ]
        },
      ]
    };
    mockService.getThirdServices.and.returnValue(asyncData(allThirdProducts));
    await component.ngOnInit();
    expect(mockService.getThirdServices).toHaveBeenCalled();
    const emptyProducts = {
      code: 200,
      message: 'message',
      error: '',
      allProducts: []
    };
    mockService.getThirdServices.and.returnValue(asyncData(emptyProducts));
    await component.ngOnInit();
    component.updateTotalService(true, 40, allThirdProducts.allProducts[0].thirdProduct);
    component.updateTotalService(false, 40, allThirdProducts.allProducts[0].thirdProduct);

    const createMock = {
      "id": "88084037",
      "id_user": "nsa_bba5522e",
      "id_service": "d890e14f",
      "user_name": "Pepito",
      "user_address": "Calle 123 #24-45",
      "user_neighborhood": "Engativa",
      "user_phone": "3223443231",
      "value": 50,
      "service_date": "2024-04-19T00:00:00.000Z",
      "updatedAt": "2024-04-22T18:12:15.600Z",
      "createdAt": "2024-04-22T18:12:15.600Z",
      "code": 201,
      "message": "Customer service created",
      "error": ""
    };
    mockService.createCustomerService.and.returnValue(asyncData(createMock));
    const productServices : ThirdProduct[] = [
      {
        id: "36692436",
        id_third_user: "1",
        name: "Entrenador XX",
        description: "Ofrece servicios de entrenamiento personalizado y muy baratos",
        value: 40,
        typeProduct: "trainer",
        representative_phone: "3223467890",
        address: "Calle 123",
        availability: []
      }
    ];
    component.productServices = productServices;
    component.createCustomerService({} as any);
  });
});

describe('ThirdDetailService', () => {
  let service: ThirdDetailService;
  let httpMock: HttpTestingController;

  const allThirdProducts: ThirdProductAllResponse = {
    code: 200,
    message: 'message',
    error: '',
    allProducts: [
      {
        message: "message",
        code: 200,
        error: "",
        productType: "trainer",
        thirdProduct: {
          id: "36692436",
          id_third_user: "1",
          name: "Entrenador XX",
          description: "Ofrece servicios de entrenamiento personalizado y muy baratos",
          value: 40,
          typeProduct: "trainer",
          representative_phone: "3223467890",
          address: "Calle 123",
          availability: []
        },
        trainer: {},
        doctor: {},
        availability: [
          {
            day: "martes",
            time_start: 11,
            time_end: 15,
          }
        ]
      },
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThirdDetailService]
    });

    service = TestBed.get(ThirdDetailService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should get all catalog', () => {

    service.getThirdServices("1").subscribe(response => {
      expect(response).toEqual(allThirdProducts);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}third/third_product/1`);
    expect(req.request.method).toBe('GET');
    req.flush(allThirdProducts); // Provide the mockResponse as the response
  });

  it('should create customer service', () => {
    const createMock = {
      "id": "88084037",
      "id_user": "nsa_bba5522e",
      "id_service": "d890e14f",
      "user_name": "Pepito",
      "user_address": "Calle 123 #24-45",
      "user_neighborhood": "Engativa",
      "user_phone": "3223443231",
      "value": 50,
      "service_date": "2024-04-19T00:00:00.000Z",
      "updatedAt": "2024-04-22T18:12:15.600Z",
      "createdAt": "2024-04-22T18:12:15.600Z",
      "code": 201,
      "message": "Customer service created",
      "error": ""
    };
    service.createCustomerService({} as any).subscribe(response => {
      expect(response).toEqual(createMock);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}third/customer_service`);
    expect(req.request.method).toBe('POST');
    req.flush(createMock); // Provide the mockResponse as the response
  });
});
