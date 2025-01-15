import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyTableComponent } from './emergency-table.component';

describe('EmergencyTableComponent', () => {
  let component: EmergencyTableComponent;
  let fixture: ComponentFixture<EmergencyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
