import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCategoryComponent } from './landing-category.component';

describe('LandingCategoryComponent', () => {
  let component: LandingCategoryComponent;
  let fixture: ComponentFixture<LandingCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
