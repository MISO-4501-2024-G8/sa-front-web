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
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['removeItem']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    component = new NavbarUserComponent(mockSessionStorageService, mockRouter);
  });

  it('should remove token and userType from session storage and navigate to home page when logOut is called', () => {
    component.logOut();
    expect(mockSessionStorageService.removeItem).toHaveBeenCalledWith('token');
    expect(mockSessionStorageService.removeItem).toHaveBeenCalledWith('userType');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});

