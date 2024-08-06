import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CStockComponent } from './c-stock.component';

describe('CStockComponent', () => {
  let component: CStockComponent;
  let fixture: ComponentFixture<CStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
