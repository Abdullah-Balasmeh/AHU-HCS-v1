import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyOrderRequestComponent } from './emergency-order-request.component';

describe('EmergencyOrderRequestComponent', () => {
  let component: EmergencyOrderRequestComponent;
  let fixture: ComponentFixture<EmergencyOrderRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyOrderRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyOrderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
