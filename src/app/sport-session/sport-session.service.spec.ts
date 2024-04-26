/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SportSessionService } from './sport-session.service';

describe('Service: SportSession', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SportSessionService]
    });
  });

  it('should ...', inject([SportSessionService], (service: SportSessionService) => {
    expect(service).toBeTruthy();
  }));
});
