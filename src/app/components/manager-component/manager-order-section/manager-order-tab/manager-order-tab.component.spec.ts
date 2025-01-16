import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOrderTabComponent } from './manager-order-tab.component';

describe('ManagerOrderTabComponent', () => {
  let component: ManagerOrderTabComponent;
  let fixture: ComponentFixture<ManagerOrderTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerOrderTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerOrderTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
