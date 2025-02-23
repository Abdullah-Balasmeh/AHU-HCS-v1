import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingTabComponent } from './following-tab.component';

describe('FollowingTabComponent', () => {
  let component: FollowingTabComponent;
  let fixture: ComponentFixture<FollowingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowingTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
