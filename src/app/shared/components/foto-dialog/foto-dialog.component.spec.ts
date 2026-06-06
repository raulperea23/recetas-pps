import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoDialogComponent } from './foto-dialog.component';

describe('FotoDialogComponent', () => {
  let component: FotoDialogComponent;
  let fixture: ComponentFixture<FotoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
