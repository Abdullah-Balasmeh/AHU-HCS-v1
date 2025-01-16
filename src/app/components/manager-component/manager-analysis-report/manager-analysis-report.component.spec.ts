import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAnalysisReportComponent } from './manager-analysis-report.component';

describe('ManagerAnalysisReportComponent', () => {
  let component: ManagerAnalysisReportComponent;
  let fixture: ComponentFixture<ManagerAnalysisReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAnalysisReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAnalysisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
