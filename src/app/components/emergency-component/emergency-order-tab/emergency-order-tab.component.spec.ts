import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyOrderTabComponent } from './emergency-order-tab.component';

describe('EmergencyOrderTabComponent', () => {
  let component: EmergencyOrderTabComponent;
  let fixture: ComponentFixture<EmergencyOrderTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyOrderTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyOrderTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
