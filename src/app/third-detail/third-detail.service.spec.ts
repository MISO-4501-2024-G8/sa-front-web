/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ThirdDetailService } from './third-detail.service';

describe('Service: ThirdDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdDetailService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([ThirdDetailService], (service: ThirdDetailService) => {
    expect(service).toBeTruthy();
  }));
});
