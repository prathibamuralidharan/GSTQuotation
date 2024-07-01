import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VPdfQuotationComponent } from './v-pdf-quatation.component';

describe('VPdfQuatationComponent', () => {
  let component: VPdfQuotationComponent;
  let fixture: ComponentFixture<VPdfQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VPdfQuotationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VPdfQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
