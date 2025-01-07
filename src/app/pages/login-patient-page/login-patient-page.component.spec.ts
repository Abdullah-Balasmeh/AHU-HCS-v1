import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPatientPageComponent } from './login-patient-page.component';

describe('LoginPatientPageComponent', () => {
  let component: LoginPatientPageComponent;
  let fixture: ComponentFixture<LoginPatientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPatientPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
