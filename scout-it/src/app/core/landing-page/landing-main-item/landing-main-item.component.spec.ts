import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMainItemComponent } from './landing-main-item.component';

describe('LandingMainItemComponent', () => {
  let component: LandingMainItemComponent;
  let fixture: ComponentFixture<LandingMainItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingMainItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingMainItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
