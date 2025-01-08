import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyMalePageComponent } from './emergency-male-page.component';

describe('EmergencyMalePageComponent', () => {
  let component: EmergencyMalePageComponent;
  let fixture: ComponentFixture<EmergencyMalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyMalePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyMalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
