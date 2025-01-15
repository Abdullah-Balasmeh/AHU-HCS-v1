import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyTabComponent } from './emergency-tab.component';

describe('EmergencyTabComponent', () => {
  let component: EmergencyTabComponent;
  let fixture: ComponentFixture<EmergencyTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
