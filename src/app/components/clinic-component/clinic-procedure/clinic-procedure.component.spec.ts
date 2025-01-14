import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicProcedureComponent } from './clinic-procedure.component';

describe('ClinicProcedureComponent', () => {
  let component: ClinicProcedureComponent;
  let fixture: ComponentFixture<ClinicProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicProcedureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
