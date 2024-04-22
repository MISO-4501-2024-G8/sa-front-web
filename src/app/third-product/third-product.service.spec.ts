/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ThirdProductService } from './third-product.service';
import { ThirdProductComponent } from './third-product.component';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from '../utils/session-storage.service';
import { ThirdProductAllResponse } from '../models/thirdpall_response';

function asyncData<T>(data: T) {
  return of(data).pipe(delay(0));
}

describe('Service: ThirdProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThirdProductService]
    });
  });

  it('should ...', inject([ThirdProductService], (service: ThirdProductService) => {
    expect(service).toBeTruthy();
  }));
});

describe('ThirdProduct Component', async () => {
  let component: ThirdProductComponent;
  let fixture: ComponentFixture<ThirdProductComponent>;
  let mockService: jasmine.SpyObj<ThirdProductService>;
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

  const deleteResponse = {
    code: 200,
    message: 'message',
    error: ''
  };

  beforeEach(async () => {
    mockService = jasmine.createSpyObj(['getAllTPbyID','deleteThirdProduct']);
    mockToastrService = jasmine.createSpyObj(['success', 'error', 'clear', 'show','info']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);
    (mockSessionStorageService.getItem as jasmine.Spy).and.returnValue('1');

    TestBed.configureTestingModule({
      declarations: [ThirdProductComponent],
      providers: [
        { provide: ThirdProductService, useValue: mockService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
      ]
    });

    mockService.getAllTPbyID.and.returnValue(asyncData(allThirdProducts));
    mockService.deleteThirdProduct.and.returnValue(asyncData(deleteResponse));

    fixture = TestBed.createComponent(ThirdProductComponent);
    component = fixture.componentInstance;
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
    mockService.getAllTPbyID.and.returnValue(asyncData(allThirdProducts));
    await component.ngOnInit();
    expect(mockService.getAllTPbyID).toHaveBeenCalled();
    const emptyProducts = {
      code: 200,
      message: 'message',
      error: '',
      allProducts: []
    };
    mockService.getAllTPbyID.and.returnValue(asyncData(emptyProducts));
    await component.ngOnInit();
  });

  it('should delete a product', async () => {
    const id = '36692436';
    mockService.deleteThirdProduct.and.returnValue(asyncData({ code: 200, message: 'message', error: '' }));
    await component.deleteProduct(id);
    expect(mockService.deleteThirdProduct).toHaveBeenCalled();
  });

  it('should go to the add product page', async () => {
    await component.addProduct();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});

describe('ThirdProductService', () => {
  let service: ThirdProductService;
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

  const deleteResponse = {
    code: 200,
    message: 'message',
    error: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThirdProductService]
    });

    service = TestBed.get(ThirdProductService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should getAllTPbyID', () => {
    service.getAllTPbyID('id').subscribe(response => {
      expect(response).toEqual(allThirdProducts);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}third/third_product/id`);
    expect(req.request.method).toBe('GET');
    req.flush(allThirdProducts); // Provide the mockResponse as the response
  });

  it('should deleteThirdProduct', () => {
    service.deleteThirdProduct('id').subscribe(response => {
      expect(response).toEqual(deleteResponse);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}third/third_product/id`);
    expect(req.request.method).toBe('DELETE');
    req.flush(deleteResponse); // Provide the mockResponse as the response
  });
});
