import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpTableComponent } from './bp-table.component';

describe('BpTableComponent', () => {
  let component: BpTableComponent;
  let fixture: ComponentFixture<BpTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BpTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
