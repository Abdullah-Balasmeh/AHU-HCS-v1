import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyOrderComponent } from './pharmacy-order.component';

describe('PharmacyOrderComponent', () => {
  let component: PharmacyOrderComponent;
  let fixture: ComponentFixture<PharmacyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
