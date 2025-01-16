import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTraineeDailogComponent } from './manager-trainee-dailog.component';

describe('ManagerTraineeDailogComponent', () => {
  let component: ManagerTraineeDailogComponent;
  let fixture: ComponentFixture<ManagerTraineeDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerTraineeDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerTraineeDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
