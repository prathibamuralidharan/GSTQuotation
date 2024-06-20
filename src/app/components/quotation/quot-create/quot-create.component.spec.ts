import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotCreateComponent } from './quot-create.component';

describe('QuotCreateComponent', () => {
  let component: QuotCreateComponent;
  let fixture: ComponentFixture<QuotCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuotCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuotCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
