/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SportSessionService } from './sport-session.service';

describe('Service: SportSession', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SportSessionService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([SportSessionService], (service: SportSessionService) => {
    expect(service).toBeTruthy();
  }));
});
