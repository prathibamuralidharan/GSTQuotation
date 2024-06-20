import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCreatepopComponent } from './cat-createpop.component';

describe('CatCreatepopComponent', () => {
  let component: CatCreatepopComponent;
  let fixture: ComponentFixture<CatCreatepopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatCreatepopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatCreatepopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
