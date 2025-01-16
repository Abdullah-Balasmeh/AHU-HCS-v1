import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRigestTraineeTabComponent } from './manager-rigest-trainee-tab.component';

describe('ManagerRigestTraineeTabComponent', () => {
  let component: ManagerRigestTraineeTabComponent;
  let fixture: ComponentFixture<ManagerRigestTraineeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerRigestTraineeTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerRigestTraineeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
