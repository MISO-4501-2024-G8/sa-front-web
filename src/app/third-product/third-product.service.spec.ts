/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThirdProductService } from './third-product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: ThirdProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThirdProductService]
    });
  });

  it('should ...', inject([ThirdProductService], (service: ThirdProductService) => {
    expect(service).toBeTruthy();
  }));
});
