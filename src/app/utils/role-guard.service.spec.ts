import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RoleGuard } from './role-guard.service';
import { AuthService } from './auth.service';

describe('RoleGuard', () => {
  let roleGuard: RoleGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const mockSnapshot: any = { url: '/some-url' };


  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isTokenValid', 'getUserRole']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    roleGuard = TestBed.inject(RoleGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should navigate to /login if token is not valid', () => {
    authService.isTokenValid.and.returnValue(false);
    const route = { data: { expectedRole: '1' } } as any;
    expect(roleGuard.canActivate(route, mockSnapshot)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to /third-home if user role is 2', () => {
    authService.isTokenValid.and.returnValue(true);
    authService.getUserRole.and.returnValue('2');
    const route = { data: { expectedRole: '1' } } as any;
    expect(roleGuard.canActivate(route, mockSnapshot)).toBe(true);
    expect(router.navigate).toHaveBeenCalledWith(['/third-home']);
  });

  it('should navigate to /home if user role is 1', () => {
    authService.isTokenValid.and.returnValue(true);
    authService.getUserRole.and.returnValue('1');
    const route = { data: { expectedRole: '2' } } as any;
    expect(roleGuard.canActivate(route, mockSnapshot)).toBe(true);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to / if user role is not 1 or 2', () => {
    authService.isTokenValid.and.returnValue(true);
    authService.getUserRole.and.returnValue('3');
    const route = { data: { expectedRole: '1' } } as any;
    expect(roleGuard.canActivate(route, mockSnapshot)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
