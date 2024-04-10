import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartpComponent } from './startp.component';

describe('StartpComponent', () => {
  let component: StartpComponent;
  let fixture: ComponentFixture<StartpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
