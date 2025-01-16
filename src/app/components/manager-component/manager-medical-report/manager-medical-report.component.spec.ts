import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerMedicalReportComponent } from './manager-medical-report.component';

describe('ManagerMedicalReportComponent', () => {
  let component: ManagerMedicalReportComponent;
  let fixture: ComponentFixture<ManagerMedicalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerMedicalReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerMedicalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
