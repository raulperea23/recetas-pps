import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDialogComponent } from './tabla-dialog.component';

describe('TablaDialogComponent', () => {
  let component: TablaDialogComponent;
  let fixture: ComponentFixture<TablaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
