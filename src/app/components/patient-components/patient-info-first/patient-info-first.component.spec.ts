import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInfoFirstComponent } from './patient-info-first.component';

describe('PatientInfoFirstComponent', () => {
  let component: PatientInfoFirstComponent;
  let fixture: ComponentFixture<PatientInfoFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientInfoFirstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientInfoFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
