import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyFemalePageComponent } from './emergency-female-page.component';

describe('EmergencyFemalePageComponent', () => {
  let component: EmergencyFemalePageComponent;
  let fixture: ComponentFixture<EmergencyFemalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyFemalePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyFemalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
