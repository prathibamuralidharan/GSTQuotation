import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PViewComponent } from './p-view.component';

describe('PViewComponent', () => {
  let component: PViewComponent;
  let fixture: ComponentFixture<PViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
