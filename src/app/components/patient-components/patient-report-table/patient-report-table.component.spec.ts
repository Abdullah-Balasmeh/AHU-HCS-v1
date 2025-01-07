import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReportTableComponent } from './patient-report-table.component';

describe('PatientReportTableComponent', () => {
  let component: PatientReportTableComponent;
  let fixture: ComponentFixture<PatientReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientReportTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
