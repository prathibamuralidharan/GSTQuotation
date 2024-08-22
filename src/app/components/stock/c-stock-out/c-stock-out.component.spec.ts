import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CStockOutComponent } from './c-stock-out.component';

describe('CStockOutComponent', () => {
  let component: CStockOutComponent;
  let fixture: ComponentFixture<CStockOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CStockOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CStockOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
