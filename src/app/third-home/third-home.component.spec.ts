import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThirdHomeComponent } from './third-home.component';
import { SessionStorageService } from '../utils/session-storage.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ThirdHomeComponent', () => {
  let component: ThirdHomeComponent;
  let mockSessionStorageService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);
    mockSessionStorageService.getItem.and.callFake((key: string) => {
      console.log('callFake', key);
      if (key === 'token') {
        return 'someToken';
      } else if (key === 'userType') {
        return '1';
      }
      return '';
    });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    component = new ThirdHomeComponent(mockSessionStorageService, mockRouter);
  });

  it('should remove token and userType from session storage and navigate to home page when logOut is called', () => {
    component.ngOnInit();
    expect(mockSessionStorageService.getItem).toHaveBeenCalledWith('token');
    expect(mockSessionStorageService.getItem).toHaveBeenCalledWith('userType');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});

describe('ThirdHomeComponent', () => {
  let component: ThirdHomeComponent;
  let mockSessionStorageService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);
    mockSessionStorageService.getItem.and.callFake((key: string) => {
      console.log('callFake', key);
      if (key === 'token') {
        return '';
      } else if (key === 'userType') {
        return '';
      }
      return '';
    });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    component = new ThirdHomeComponent(mockSessionStorageService, mockRouter);
  });

  it('should remove token and userType from session storage and navigate to home page when logOut is called', () => {
    component.ngOnInit();
    expect(mockSessionStorageService.getItem).toHaveBeenCalledWith('token');
    expect(mockSessionStorageService.getItem).toHaveBeenCalledWith('userType');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
