import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorRecetasComponent } from './constructor-recetas.component';

describe('ConstructorRecetasComponent', () => {
  let component: ConstructorRecetasComponent;
  let fixture: ComponentFixture<ConstructorRecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructorRecetasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConstructorRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
