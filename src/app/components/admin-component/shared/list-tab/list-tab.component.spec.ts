import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTabComponent } from './list-tab.component';

describe('ListTabComponent', () => {
  let component: ListTabComponent;
  let fixture: ComponentFixture<ListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
