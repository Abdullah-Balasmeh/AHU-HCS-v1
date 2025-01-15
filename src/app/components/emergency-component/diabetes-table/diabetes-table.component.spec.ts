import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabetesTableComponent } from './diabetes-table.component';

describe('DiabetesTableComponent', () => {
  let component: DiabetesTableComponent;
  let fixture: ComponentFixture<DiabetesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiabetesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiabetesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
