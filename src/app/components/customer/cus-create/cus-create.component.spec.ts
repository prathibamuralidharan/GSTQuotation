import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusCreateComponent } from './cus-create.component';

describe('CusCreateComponent', () => {
  let component: CusCreateComponent;
  let fixture: ComponentFixture<CusCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CusCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
