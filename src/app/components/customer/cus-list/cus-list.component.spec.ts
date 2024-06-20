import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusListComponent } from './cus-list.component';

describe('CusListComponent', () => {
  let component: CusListComponent;
  let fixture: ComponentFixture<CusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CusListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
