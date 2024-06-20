import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LQuatationComponent } from './l-quatation.component';

describe('LQuatationComponent', () => {
  let component: LQuatationComponent;
  let fixture: ComponentFixture<LQuatationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LQuatationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LQuatationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
