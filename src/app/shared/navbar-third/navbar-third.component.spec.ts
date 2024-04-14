/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavbarThirdComponent } from './navbar-third.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarThirdComponent', () => {
  let component: NavbarThirdComponent;
  let fixture: ComponentFixture<NavbarThirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarThirdComponent ],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('NavbarThirdComponent', () => {
  let component: NavbarThirdComponent;
  let mockSessionStorageService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['removeItem']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    component = new NavbarThirdComponent(mockSessionStorageService, mockRouter);
  });

  it('should remove token and userType from session storage and navigate to home page when logOut is called', () => {
    component.logOut();
    expect(mockSessionStorageService.removeItem).toHaveBeenCalledWith('token');
    expect(mockSessionStorageService.removeItem).toHaveBeenCalledWith('userType');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
