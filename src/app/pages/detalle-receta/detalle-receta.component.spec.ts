import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRecetaComponent } from './detalle-receta.component';

describe('DetalleRecetaComponent', () => {
  let component: DetalleRecetaComponent;
  let fixture: ComponentFixture<DetalleRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleRecetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
