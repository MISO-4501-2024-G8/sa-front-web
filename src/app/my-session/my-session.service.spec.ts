/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MySessionService } from './my-session.service';

describe('Service: MySession', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MySessionService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([MySessionService], (service: MySessionService) => {
    expect(service).toBeTruthy();
  }));
});
