import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRigestTraineeTableComponent } from './manager-rigest-trainee-table.component';

describe('ManagerRigestTraineeTableComponent', () => {
  let component: ManagerRigestTraineeTableComponent;
  let fixture: ComponentFixture<ManagerRigestTraineeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerRigestTraineeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerRigestTraineeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
