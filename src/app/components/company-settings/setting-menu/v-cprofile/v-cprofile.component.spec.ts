import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VCprofileComponent } from './v-cprofile.component';

describe('VCprofileComponent', () => {
  let component: VCprofileComponent;
  let fixture: ComponentFixture<VCprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VCprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VCprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
