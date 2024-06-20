import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VPdfQuatationComponent } from './v-pdf-quatation.component';

describe('VPdfQuatationComponent', () => {
  let component: VPdfQuatationComponent;
  let fixture: ComponentFixture<VPdfQuatationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VPdfQuatationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VPdfQuatationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
