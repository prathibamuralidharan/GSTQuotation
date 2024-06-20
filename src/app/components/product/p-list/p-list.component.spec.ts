import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PListComponent } from './p-list.component';

describe('PListComponent', () => {
  let component: PListComponent;
  let fixture: ComponentFixture<PListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
