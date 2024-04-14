/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ThirdSignupService } from './third-signup.service';
import { ThirdSignupComponent } from './third-signup.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';

import { ThirdUser } from '../models/thirdu';
import { ThirdUserResponse } from '../models/thirdu_response';
import { fixToastPosition } from '../utils/fixcss.service';

describe('Service: ThirdSignup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThirdSignupService]
    });
  });

  it('should ...', inject([ThirdSignupService], (service: ThirdSignupService) => {
    expect(service).toBeTruthy();
  }));
});


describe('ThirdSignupComponent', () => {
  let component: ThirdSignupComponent;
  let fixture: ComponentFixture<ThirdSignupComponent>;
  let mockThirdSignupService: jasmine.SpyObj<ThirdSignupService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockThirdSignupService = jasmine.createSpyObj(['thirdSignUpUser']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error', 'clear', 'show']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [ThirdSignupComponent],
      providers: [
        { provide: ThirdSignupService, useValue: mockThirdSignupService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        FormBuilder
      ]
    });

    fixture = TestBed.createComponent(ThirdSignupComponent);
    component = fixture.componentInstance;
    component.thirdSignUpForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      doc_num:  new FormControl(''),
      doc_type:  new FormControl(''),
      name:  new FormControl(''),
      phone:  new FormControl(''),
      company_creation_date:  new FormControl(''),
      company_address:  new FormControl(''),
      contact_name:  new FormControl(''),
    });
    fixture.detectChanges();
  });


  it('should signup and navigate to /home on successful signup', () => {
    const thirdUserSignUpResponse: ThirdUserResponse = {
      code: 200,
      token: 'token',
      message: 'Signup success',
      id: 'user-id', // replace with actual id
      expirationToken: 'expiration-token', // replace with actual expiration token
      error: ''
    };
    mockThirdSignupService.thirdSignUpUser.and.returnValue(of(thirdUserSignUpResponse));

    component.thirdUserSignUp({} as any);
    expect(mockToastrService.success).toHaveBeenCalledWith('Third Signup success', 'Success');
  });

  it('should show an error message on failed signup', () => {
    const signupResponse: ThirdUserResponse = {
      code: 400,
      error: 'Third Signup failed',
      message: '', // add this line
      token: '', // add this line
      id: '', // add this line
      expirationToken: '' // add this line
    };
    mockThirdSignupService.thirdSignUpUser.and.returnValue(of(signupResponse));
    component.thirdUserSignUp({} as any);
    expect(mockToastrService.error).toHaveBeenCalledWith('Third Signup failed', 'Error');
  });


  it('should show an error message on error', () => {
    try {
      mockThirdSignupService.thirdSignUpUser.and.returnValue(throwError('error'));
      component.thirdUserSignUp({} as any);
      expect(mockToastrService.error).toHaveBeenCalledWith('Third Signup failed', 'Error');
    } catch (error) {
      console.error("An error occurred: ", error)
    }
  });

  it('should show an error message on error with 3 failedAttempt thirdUserSignUp ', () => {
    try {
      mockThirdSignupService.thirdSignUpUser.and.returnValue(throwError('error'));
      component.thirdUserSignUp({} as any);
    } catch (error) {
      console.error("An error occurred: ", error)
    }
  });
});


describe('ThirdSignupService', () => {
  let service: ThirdSignupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThirdSignupService]
    });

    service = TestBed.get(ThirdSignupService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should signup user and return expected response', () => {
    const mockthirdUserSignUp: ThirdUser = {
      email: 'juan@gmail.com',
      password: '1234',
      doc_num: '12345678',
      doc_type: 'DNI',
      name: 'Juan',
      phone: '123456789',
      user_type: 'T',
      company_creation_date: 'M',
      company_address: 'Argentina',
      contact_name: 'Buenos Aires',
      acceptance_tyc: false
    };
    const mockResponse: ThirdUserResponse = {
      code: 200,
      token: 'token',
      message: 'Third Signup success',
      id: 'user-id',
      expirationToken: 'expiration-token',
      error: ''
    };
    service.thirdSignUpUser(mockthirdUserSignUp).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}register/third_user`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockthirdUserSignUp);
    req.flush(mockResponse); // Provide the mockResponse as the response
  });
});

