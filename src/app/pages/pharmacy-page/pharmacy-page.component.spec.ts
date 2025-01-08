import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPageComponent } from './pharmacy-page.component';

describe('PharmacyPageComponent', () => {
  let component: PharmacyPageComponent;
  let fixture: ComponentFixture<PharmacyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
