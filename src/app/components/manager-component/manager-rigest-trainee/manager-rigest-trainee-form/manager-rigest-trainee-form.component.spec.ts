import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRigestTraineeFormComponent } from './manager-rigest-trainee-form.component';

describe('ManagerRigestTraineeFormComponent', () => {
  let component: ManagerRigestTraineeFormComponent;
  let fixture: ComponentFixture<ManagerRigestTraineeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerRigestTraineeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerRigestTraineeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
