import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyTabComponent } from './pharmacy-tab.component';

describe('PharmacyTabComponent', () => {
  let component: PharmacyTabComponent;
  let fixture: ComponentFixture<PharmacyTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
