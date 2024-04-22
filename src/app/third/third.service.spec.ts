/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThirdService } from './third.service';

describe('Service: Third', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdService]
    });
  });

  it('should ...', inject([ThirdService], (service: ThirdService) => {
    expect(service).toBeTruthy();
  }));
});
