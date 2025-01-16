import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOrderSectionComponent } from './manager-order-section.component';

describe('ManagerOrderSectionComponent', () => {
  let component: ManagerOrderSectionComponent;
  let fixture: ComponentFixture<ManagerOrderSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerOrderSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerOrderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
