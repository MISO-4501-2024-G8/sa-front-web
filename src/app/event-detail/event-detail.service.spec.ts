/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventDetailService } from './event-detail.service';

describe('Service: EventDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventDetailService]
    });
  });

  it('should ...', inject([EventDetailService], (service: EventDetailService) => {
    expect(service).toBeTruthy();
  }));
});
