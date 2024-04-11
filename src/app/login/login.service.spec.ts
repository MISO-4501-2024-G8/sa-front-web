/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { LoginComponent } from './login.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';

import { LoginUser } from '../models/loginu';
import { LoginUserResponse } from '../models/loginu_response';


describe('Service: Login', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // add this line
      providers: [LoginService]
    });
  });

  it('should ...', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService: jasmine.SpyObj<LoginService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockLoginService = jasmine.createSpyObj(['loginUser']);
    mockToastrService = jasmine.createSpyObj(['success', 'error']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        FormBuilder
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should login and navigate to /home on successful login', () => {
    const loginResponse: LoginUserResponse = {
      code: 200,
      token: 'token',
      message: 'Login successful',
      id: 'user-id', // replace with actual id
      expirationToken: 'expiration-token', // replace with actual expiration token
      error: ''
    };
    mockLoginService.loginUser.and.returnValue(of(loginResponse));
    component.loginUser({} as any);
    expect(mockToastrService.success).toHaveBeenCalledWith('Login successfully', 'Confirmation');
  });

  it('should emit cancel', () => {
    component.cancelCreation();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show an error message on failed login', () => {
    const loginResponse: LoginUserResponse = {
      code: 400,
      error: 'Login failed',
      message: '', // add this line
      token: '', // add this line
      id: '', // add this line
      expirationToken: '' // add this line
    };
    mockLoginService.loginUser.and.returnValue(of(loginResponse));
    component.loginUser({} as any);
    expect(mockToastrService.error).toHaveBeenCalledWith('Login failed', 'Error');
  });

  it('should show an error message on error', () => {
    try {
      mockLoginService.loginUser.and.returnValue(throwError('error'));
      component.loginUser({} as any);
      expect(mockToastrService.error).toHaveBeenCalledWith('An error occurred', 'Error');
    } catch (error) {
      console.error("An error occurred: ", error)
    }
  });
});


describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });

    service = TestBed.get(LoginService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should login user and return expected response', () => {
    const mockLoginUser: LoginUser = {
      email: 'juan@gmail.com',
      password: '1234'
    };
    const mockResponse: LoginUserResponse = {
      code: 200,
      token: 'token',
      message: 'Login successful',
      id: 'user-id',
      expirationToken: 'expiration-token',
      error: ''
    };

    service.loginUser(mockLoginUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}login/user`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLoginUser);

    req.flush(mockResponse); // Provide the mockResponse as the response
  });
});
