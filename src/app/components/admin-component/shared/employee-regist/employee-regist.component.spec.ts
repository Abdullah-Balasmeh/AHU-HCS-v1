import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegistComponent } from './employee-regist.component';

describe('EmployeeRegistComponent', () => {
  let component: EmployeeRegistComponent;
  let fixture: ComponentFixture<EmployeeRegistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeRegistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeRegistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
