import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRigestTraineeComponent } from './manager-rigest-trainee.component';

describe('ManagerRigestTraineeComponent', () => {
  let component: ManagerRigestTraineeComponent;
  let fixture: ComponentFixture<ManagerRigestTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerRigestTraineeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerRigestTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
