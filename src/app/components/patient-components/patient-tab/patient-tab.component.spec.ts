import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTabComponent } from './patient-tab.component';

describe('PatientTabComponent', () => {
  let component: PatientTabComponent;
  let fixture: ComponentFixture<PatientTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
