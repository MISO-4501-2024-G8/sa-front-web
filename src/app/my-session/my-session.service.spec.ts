/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MySessionService } from './my-session.service';

describe('Service: MySession', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MySessionService]
    });
  });

  it('should ...', inject([MySessionService], (service: MySessionService) => {
    expect(service).toBeTruthy();
  }));
});
