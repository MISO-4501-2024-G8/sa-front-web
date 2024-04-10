import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdSignupComponent } from './third-signup.component';

describe('ThirdSignupComponent', () => {
  let component: ThirdSignupComponent;
  let fixture: ComponentFixture<ThirdSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
