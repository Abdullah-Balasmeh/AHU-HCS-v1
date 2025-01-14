import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInfoDisplayComponent } from './patient-info-display.component';

describe('PatientInfoDisplayComponent', () => {
  let component: PatientInfoDisplayComponent;
  let fixture: ComponentFixture<PatientInfoDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientInfoDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientInfoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
