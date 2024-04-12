/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ThirdSignupService } from './third-signup.service';

describe('Service: ThirdSignup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThirdSignupService]
    });
  });

  it('should ...', inject([ThirdSignupService], (service: ThirdSignupService) => {
    expect(service).toBeTruthy();
  }));
});
