import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSectionComponent } from './list-section.component';

describe('ListSectionComponent', () => {
  let component: ListSectionComponent;
  let fixture: ComponentFixture<ListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
