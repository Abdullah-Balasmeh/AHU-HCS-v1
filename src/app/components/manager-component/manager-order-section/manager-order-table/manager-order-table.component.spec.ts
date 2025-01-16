import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOrderTableComponent } from './manager-order-table.component';

describe('ManagerOrderTableComponent', () => {
  let component: ManagerOrderTableComponent;
  let fixture: ComponentFixture<ManagerOrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerOrderTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
