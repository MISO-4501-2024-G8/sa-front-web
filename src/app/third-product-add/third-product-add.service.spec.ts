/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThirdProductAddService } from './third-product-add.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service: ThirdProductAdd', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThirdProductAddService]
    });
  });

  it('should ...', inject([ThirdProductAddService], (service: ThirdProductAddService) => {
    expect(service).toBeTruthy();
  }));
});
