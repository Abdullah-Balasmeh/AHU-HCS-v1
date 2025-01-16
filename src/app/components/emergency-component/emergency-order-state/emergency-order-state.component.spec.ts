import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyOrderStateComponent } from './emergency-order-state.component';

describe('EmergencyOrderStateComponent', () => {
  let component: EmergencyOrderStateComponent;
  let fixture: ComponentFixture<EmergencyOrderStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyOrderStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyOrderStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
