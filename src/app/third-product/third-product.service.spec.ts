/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThirdProductService } from './third-product.service';

describe('Service: ThirdProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdProductService]
    });
  });

  it('should ...', inject([ThirdProductService], (service: ThirdProductService) => {
    expect(service).toBeTruthy();
  }));
});
