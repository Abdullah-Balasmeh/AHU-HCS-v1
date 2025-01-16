import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyOrderComponent } from './emergency-order.component';

describe('EmergencyOrderComponent', () => {
  let component: EmergencyOrderComponent;
  let fixture: ComponentFixture<EmergencyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
