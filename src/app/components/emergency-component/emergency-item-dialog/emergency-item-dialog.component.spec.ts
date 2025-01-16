import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyItemDialogComponent } from './emergency-item-dialog.component';

describe('EmergencyItemDialogComponent', () => {
  let component: EmergencyItemDialogComponent;
  let fixture: ComponentFixture<EmergencyItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
