/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NavbarUserComponent } from './navbar-user.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarUserComponent 1', () => {
  let component: NavbarUserComponent;
  let fixture: ComponentFixture<NavbarUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarUserComponent ],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('NavbarUserComponent', () => {
  let component: NavbarUserComponent;
  let mockSessionStorageService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['removeItem','getItem']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    component = new NavbarUserComponent(mockSessionStorageService, mockRouter);
  });

  it('should remove token and userType from session storage and navigate to home page when logOut is called', () => {
    component.logOut();
    expect(mockSessionStorageService.removeItem).toHaveBeenCalledWith('token');
    expect(mockSessionStorageService.removeItem).toHaveBeenCalledWith('userType');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set userPlan to "Básico" if session storage returns "basico"', () => {
    mockSessionStorageService.getItem.and.returnValue('basico');
    component.ngOnInit();
    expect(component.userPlan).toEqual('Básico');
  });

  it('should set userPlan to "Intermedio" if session storage returns "intermedio"', () => {
    mockSessionStorageService.getItem.and.returnValue('intermedio');
    component.ngOnInit();
    expect(component.userPlan).toEqual('Intermedio');
  });

  it('should set userPlan to "Premium" if session storage returns "premium"', () => {
    mockSessionStorageService.getItem.and.returnValue('premium');
    component.ngOnInit();
    expect(component.userPlan).toEqual('Premium');
  });

  it('should set userPlan to empty string if session storage returns an unknown plan', () => {
    mockSessionStorageService.getItem.and.returnValue('unknown');
    component.ngOnInit();
    expect(component.userPlan).toEqual('');
  });
});

