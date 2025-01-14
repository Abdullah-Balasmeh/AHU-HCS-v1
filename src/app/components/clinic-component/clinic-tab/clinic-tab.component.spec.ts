import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicTabComponent } from './clinic-tab.component';

describe('ClinicTabComponent', () => {
  let component: ClinicTabComponent;
  let fixture: ComponentFixture<ClinicTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
