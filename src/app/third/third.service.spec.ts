/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ThirdService } from './third.service';

describe('Service: Third', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([ThirdService], (service: ThirdService) => {
    expect(service).toBeTruthy();
  }));
});
