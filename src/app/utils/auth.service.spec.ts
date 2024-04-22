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
    //(sessionStorageService.getItem as jasmine.Spy).and.returnValue('1');
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

  it('should check if token is valid', () => {
    sessionStorageService.getItem.and.returnValue('token');
    expect(authService.isTokenValid()).toBe(true);
    expect(sessionStorageService.getItem).toHaveBeenCalledWith('token');
  });

  it('should check if token is not valid', () => {
    sessionStorageService.getItem.and.returnValue(null);
    expect(authService.isTokenValid()).toBe(false);
    expect(sessionStorageService.getItem).toHaveBeenCalledWith('token');
  });
});
