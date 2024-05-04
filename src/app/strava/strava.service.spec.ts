/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StravaService } from './strava.service';

describe('Service: Strava', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StravaService]
    });
  });

  it('should ...', inject([StravaService], (service: StravaService) => {
    expect(service).toBeTruthy();
  }));
});
