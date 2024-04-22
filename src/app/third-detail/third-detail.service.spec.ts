/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThirdDetailService } from './third-detail.service';

describe('Service: ThirdDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdDetailService]
    });
  });

  it('should ...', inject([ThirdDetailService], (service: ThirdDetailService) => {
    expect(service).toBeTruthy();
  }));
});
