/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThirdProductAddService } from './third-product-add.service';

describe('Service: ThirdProductAdd', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdProductAddService]
    });
  });

  it('should ...', inject([ThirdProductAddService], (service: ThirdProductAddService) => {
    expect(service).toBeTruthy();
  }));
});
