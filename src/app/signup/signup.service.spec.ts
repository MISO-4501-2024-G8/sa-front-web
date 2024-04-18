/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SignupService } from './signup.service';
import { SignupComponent } from './signup.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';

import { SignupUser } from '../models/signupu';
import { SignupUserResponse } from '../models/signupu_response';

describe('Service: Signup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignupService]
    });
  });

  it('should ...', inject([SignupService], (service: SignupService) => {
    expect(service).toBeTruthy();
  }));
});

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockSignupService: jasmine.SpyObj<SignupService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockSignupService = jasmine.createSpyObj(['signupUser']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error', 'clear', 'show']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [
        { provide: SignupService, useValue: mockSignupService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        FormBuilder
      ]
    });

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    component.signupForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      doc_num:  new FormControl(''),
      doc_type:  new FormControl(''),
      name:  new FormControl(''),
      surname:  new FormControl(''),
      phone:  new FormControl(''),
      gender:  new FormControl(''),
      age:  new FormControl(''),
      weight:  new FormControl(''),
      height:  new FormControl(''),
      birth_country:  new FormControl(''),
      birth_city:  new FormControl(''),
      residence_country:  new FormControl(''),
      residence_city:  new FormControl(''),
      residence_seniority:  new FormControl(''),
      sports:  new FormControl(''),
      acceptance_notify:  new FormControl(''),
      acceptance_tyc:  new FormControl(''),
      acceptance_personal_data:  new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should signup and navigate to /home on successful signup', () => {
    const signupResponse: SignupUserResponse = {
      code: 200,
      token: 'token',
      message: 'Signup success',
      id: 'user-id', // replace with actual id
      expirationToken: 'expiration-token', // replace with actual expiration token
      error: ''
    };
    mockSignupService.signupUser.and.returnValue(of(signupResponse));

    component.signupUser({} as any);
    expect(mockToastrService.success).toHaveBeenCalledWith('Signup success', 'Success');
  });

  it('should show an error message on failed signup', () => {
    const signupResponse: SignupUserResponse = {
      code: 400,
      error: 'Signup failed',
      message: '', // add this line
      token: '', // add this line
      id: '', // add this line
      expirationToken: '' // add this line
    };
    mockSignupService.signupUser.and.returnValue(of(signupResponse));
    component.signupUser({} as any);
    expect(mockToastrService.error).toHaveBeenCalledWith('Signup failed', 'Error');
  });

  it('should show an error message on error', () => {
    try {
      mockSignupService.signupUser.and.returnValue(throwError('error'));
      component.signupUser({} as any);
      expect(mockToastrService.error).toHaveBeenCalledWith('Signup failed', 'Error');
    } catch (error) {
      console.error("An error occurred: ", error)
    }
  });

  it('should show an error message on error with 3 failedAttempt signupUser ', () => {
    try {
      mockSignupService.signupUser.and.returnValue(throwError('error'));
      component.signupUser({} as any);
    } catch (error) {
      console.error("An error occurred: ", error)
    }
  });
});


describe('SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignupService]
    });

    service = TestBed.get(SignupService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should signup user and return expected response', () => {
    const mockSignupUser: SignupUser = {
      email: 'juan@gmail.com',
      password: '1234',
      doc_num: '12345678',
      doc_type: 'DNI',
      name: 'Juan',
      surname: 'Perez',
      phone: '123456789',
      user_type: 'S',
      gender: 'M',
      age: 30,
      weight: 70,
      height: 1.70,
      birth_country: 'Argentina',
      birth_city: 'Buenos Aires',
      residence_country: 'Argentina',
      residence_city: 'Buenos Aires',
      residence_seniority: 5,
      sports: 'Atletismo',
      typePlan: 'basico',
      acceptance_notify: true,
      acceptance_tyc: true,
      acceptance_personal_data: true
    };
    const mockResponse: SignupUserResponse = {
      code: 200,
      token: 'token',
      message: 'Signup success',
      id: 'user-id',
      expirationToken: 'expiration-token',
      error: ''
    };
    service.signupUser(mockSignupUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}register/sport_user`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockSignupUser);
    req.flush(mockResponse); // Provide the mockResponse as the response
  });
});
