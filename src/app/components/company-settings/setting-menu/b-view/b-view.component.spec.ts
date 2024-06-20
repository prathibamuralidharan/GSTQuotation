import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BViewComponent } from './b-view.component';

describe('BViewComponent', () => {
  let component: BViewComponent;
  let fixture: ComponentFixture<BViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
