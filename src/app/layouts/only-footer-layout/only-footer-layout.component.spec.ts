import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyFooterLayoutComponent } from './only-footer-layout.component';

describe('OnlyFooterLayoutComponent', () => {
  let component: OnlyFooterLayoutComponent;
  let fixture: ComponentFixture<OnlyFooterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlyFooterLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnlyFooterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
