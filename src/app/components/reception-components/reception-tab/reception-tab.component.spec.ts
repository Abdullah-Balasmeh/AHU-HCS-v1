import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionTabComponent } from './reception-tab.component';

describe('ReceptionTabComponent', () => {
  let component: ReceptionTabComponent;
  let fixture: ComponentFixture<ReceptionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
