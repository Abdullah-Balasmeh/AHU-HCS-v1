import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateRegistComponent } from './certificate-regist.component';

describe('CertificateRegistComponent', () => {
  let component: CertificateRegistComponent;
  let fixture: ComponentFixture<CertificateRegistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateRegistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateRegistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
