import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { DetalleRecetaComponent } from './detalle-receta.component';
import { CompartirComponent } from '../../shared/components/compartir/compartir.component';
import { RecetasService } from '../../shared/services/recetas.service';
import { Receta } from '../../shared/models/receta.model';

describe('DetalleRecetaComponent', () => {
  it('keeps the share control and full recipe content after extracting sharing', async () => {
    const receta: Receta = {
      id: 'receta-1',
      nombre: 'Ensalada casera',
      origen: '',
      categoria: 'Ensaladas',
      tipoDePlato: 'Primer plato',
      foto: '',
      ingredientes: ['Lechuga'],
      elaboracion: 'Mezclar los ingredientes',
      comensales: 2,
      dificultad: 'Fácil',
      tiempoPreparacion: 10,
      tiempoUnidad: 'minutos',
      destacada: true,
      fechaPublicacion: new Date(),
    };
    const incrementarVisitas = jasmine.createSpy('incrementarVisitas');
    await TestBed.configureTestingModule({
      imports: [DetalleRecetaComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: receta.id })) },
        },
        {
          provide: RecetasService,
          useValue: {
            getRecetaPorId: () => of(receta),
            getRecetasRelacionadas: () => of([]),
            incrementarVisitas,
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(DetalleRecetaComponent);
    fixture.detectChanges();
    const compartir = fixture.debugElement.query(By.directive(CompartirComponent))
      .componentInstance as CompartirComponent;
    expect(compartir.nombre).toBe(receta.nombre);
    expect(compartir.enlace).toBe('');
    expect(compartir.encabezado).toBe('Mira esta receta');
    expect(fixture.nativeElement.textContent).toContain(receta.elaboracion);
    expect(incrementarVisitas).toHaveBeenCalledWith(receta.id);
  });
});
