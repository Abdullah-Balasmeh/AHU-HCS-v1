import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcedureComponent } from './add-procedure.component';

describe('AddProcedureComponent', () => {
  let component: AddProcedureComponent;
  let fixture: ComponentFixture<AddProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProcedureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
