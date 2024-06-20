import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BCreateComponent } from './b-create.component';

describe('BCreateComponent', () => {
  let component: BCreateComponent;
  let fixture: ComponentFixture<BCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
