import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { SessionStorageService } from './session-storage.service';

describe('AuthService', () => {
  let authService: AuthService;
  let sessionStorageService: jasmine.SpyObj<SessionStorageService>;

  beforeEach(() => {
    const sessionStorageServiceSpy = jasmine.createSpyObj('SessionStorageService', ['getItem']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: SessionStorageService, useValue: sessionStorageServiceSpy }
      ]
    });

    authService = TestBed.inject(AuthService);
    sessionStorageService = TestBed.inject(SessionStorageService) as jasmine.SpyObj<SessionStorageService>;
  });

  it('should get user token', () => {
    sessionStorageService.getItem.and.returnValue('token');
    expect(authService.getUserToken()).toBe('token');
    expect(sessionStorageService.getItem).toHaveBeenCalledWith('token');
  });

  it('should get user role', () => {
    sessionStorageService.getItem.and.returnValue('userType');
    expect(authService.getUserRole()).toBe('userType');
    expect(sessionStorageService.getItem).toHaveBeenCalledWith('userType');
  });

  it('should return false if token is not valid', () => {
    sessionStorageService.getItem.and.returnValue('token');
    expect(authService.isTokenValid()).toBeFalse();
    expect(sessionStorageService.getItem).toHaveBeenCalledWith('token');
  });
});


