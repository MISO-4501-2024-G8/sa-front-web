/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ThirdProductAddService } from './third-product-add.service';
import { ThirdProductAddComponent } from './third-product-add.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { environment } from '../../environments/environment';

describe('Service: ThirdProductAdd', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThirdProductAddService]
    });
  });

  it('should ...', inject([ThirdProductAddService], (service: ThirdProductAddService) => {
    expect(service).toBeTruthy();
  }));
});
describe('ThirdProductAdd Component', () => {
  let component: ThirdProductAddComponent;
  let fixture: ComponentFixture<ThirdProductAddComponent>;
  let mockService: jasmine.SpyObj<ThirdProductAddService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj(['createThirdProduct']);
    mockToastrService = jasmine.createSpyObj(['success', 'error', 'clear', 'show']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [ThirdProductAddComponent],
      providers: [
        { provide: ThirdProductAddService, useValue: mockService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        FormBuilder
      ]
    });

    fixture = TestBed.createComponent(ThirdProductAddComponent);
    component = fixture.componentInstance;
    component.productForm = new FormGroup({
      typeProduct: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      value: new FormControl(''),
      representative_phone: new FormControl(''),
      address: new FormControl(''),
      availability: new FormArray([])
    });
    component.availabilityForm = new FormGroup({
      day: new FormControl(''),
      time_start: new FormControl(''),
      time_end: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should initialize the component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should test onTypeProductChange and typeProduct', () => {
    component.onTypeProductChange({ target: { value: 'medical' } });
    component.onTypeProductChange({ target: { value: 'delivery' } });
    component.onTypeProductChange({ target: { value: 'trainer' } });
    component.productForm.get('typeProduct')?.setValue('medical');
    component.productForm.get('typeProduct')?.setValue('delivery');
    component.productForm.get('typeProduct')?.setValue('trainer');
  });

  it('should addAvailability', () => {
    const availability = {
      day: 'Monday',
      time_start: 10,
      time_end: 12
    };
    component.addAvailability(availability);
    // generate error - repeated
    component.addAvailability(availability);
    const availability_2 = {
      day: 'Monday',
      time_start: 12,
      time_end: 10
    };
    // generate error - time_start > time_end
    component.addAvailability(availability_2);
    // delete availability
    component.deleteAvailability(0);
    component.cancelAddProduct();

  });

  it('should add a new product - 1', () => {
    const createThirdProductResponse = {
      message: 'Product created successfully',
      code: 201,
      error: '',
      productType: 'delivery',
      thirdProduct: {
        id: '1',
        id_third_user: '1',
        name: 'Product 1',
        description: 'Description 1',
        value: 100,
        typeProduct: 'delivery',
        representative_phone: '123456789',
        address: 'Address 1',
        availability: []
      },
      trainer: null,
      doctor: null,
      availability: null
    };
    const mockThirdProduct = {
      id: '1',
      id_third_user: '1',
      name: 'Product 1',
      description: 'Description 1',
      value: 100,
      typeProduct: 'delivery',
      representative_phone: '123456789',
      address: 'Address 1',
      availability: []
    };
    mockService.createThirdProduct.and.returnValue(of(createThirdProductResponse));
    component.addProduct(mockThirdProduct);
    expect(mockService.createThirdProduct).toHaveBeenCalled();
  });

  it('should handle error - add a new product', () => {
    const createThirdProductResponse = {
      message: 'Error creating product',
      code: 400,
      error: 'Error creating product',
      productType: '',
      thirdProduct: {
        id: '1',
        id_third_user: '1',
        name: 'Product 1',
        description: 'Description 1',
        value: 100,
        typeProduct: 'delivery',
        representative_phone: '123456789',
        address: 'Address 1',
        availability: []
      },
      trainer: null,
      doctor: null,
      availability: null
    };
    const mockThirdProduct = {
      id: '1',
      id_third_user: '1',
      name: 'Product 1',
      description: 'Description 1',
      value: 100,
      typeProduct: 'delivery',
      representative_phone: '123456789',
      address: 'Address 1',
      availability: []
    };
    mockService.createThirdProduct.and.returnValue(of(createThirdProductResponse));
    component.addProduct(mockThirdProduct);
    expect(mockService.createThirdProduct).toHaveBeenCalled();
  });
});

describe('ThirdProductAddService', () => {
  let service: ThirdProductAddService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThirdProductAddService]
    });

    service = TestBed.get(ThirdProductAddService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should login user and return expected response', () => {
    const mockThirdProduct = {
      id: '1',
      id_third_user: '1',
      name: 'Product 1',
      description: 'Description 1',
      value: 100,
      typeProduct: 'delivery',
      representative_phone: '123456789',
      address: 'Address 1',
      availability: []
    };
    const createThirdProductResponse = {
      message: 'Product created successfully',
      code: 201,
      error: '',
      productType: 'delivery',
      thirdProduct: {
        id: '1',
        id_third_user: '1',
        name: 'Product 1',
        description: 'Description 1',
        value: 100,
        typeProduct: 'delivery',
        representative_phone: '123456789',
        address: 'Address 1',
        availability: []
      },
      trainer: null,
      doctor: null,
      availability: null
    };
    service.createThirdProduct('id',mockThirdProduct).subscribe(response => {
      expect(response).toEqual(createThirdProductResponse);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}third/third_product`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockThirdProduct);
    req.flush(createThirdProductResponse); // Provide the mockResponse as the response
  });
});
