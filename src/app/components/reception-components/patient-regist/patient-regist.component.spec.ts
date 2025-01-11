import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegistComponent } from './patient-regist.component';

describe('PatientRegistComponent', () => {
  let component: PatientRegistComponent;
  let fixture: ComponentFixture<PatientRegistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientRegistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRegistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
