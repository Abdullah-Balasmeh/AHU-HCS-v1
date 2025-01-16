import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOrderDialogComponent } from './manager-order-dialog.component';

describe('ManagerOrderDialogComponent', () => {
  let component: ManagerOrderDialogComponent;
  let fixture: ComponentFixture<ManagerOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerOrderDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
