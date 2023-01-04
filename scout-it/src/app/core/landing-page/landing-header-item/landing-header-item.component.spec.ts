import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHeaderItemComponent } from './landing-header-item.component';

describe('LandingHeaderItemComponent', () => {
  let component: LandingHeaderItemComponent;
  let fixture: ComponentFixture<LandingHeaderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingHeaderItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingHeaderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
