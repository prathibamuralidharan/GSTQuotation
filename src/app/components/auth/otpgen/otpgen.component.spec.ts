import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpgenComponent } from './otpgen.component';

describe('OtpgenComponent', () => {
  let component: OtpgenComponent;
  let fixture: ComponentFixture<OtpgenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpgenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtpgenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
