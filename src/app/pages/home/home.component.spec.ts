import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NavigationEnd,
  provideRouter,
  Router,
} from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { filter, firstValueFrom, of, ReplaySubject, Subject } from 'rxjs';

import { HomeComponent } from './home.component';
import { SALSAS } from './home.salsas';
import { RecetasService } from '../../shared/services/recetas.service';
import {
  Preparacion,
  PreparacionesService,
} from '../../shared/services/preparaciones.service';
import { Truco, TrucosService } from '../../shared/services/trucos.service';

@Component({ standalone: true, template: '' })
class OtraPaginaComponent {}

describe('HomeComponent shared modal links', () => {
  const preparacion: Preparacion = {
    id: 'preparacion-1',
    nombre: 'Masa casera',
    descripcion: 'Preparar la masa',
    icono: '',
  };
  const truco: Truco = {
    id: 'truco-1',
    nombre: 'Conservar hierbas',
    descripcion: 'Guardar las hierbas',
    icono: '',
  };
  let preparaciones$: ReplaySubject<Preparacion[]>;
  let trucos$: ReplaySubject<Truco[]>;
  let harness: RouterTestingHarness;
  let router: Router;
  let open: jasmine.Spy;
  let aviso: jasmine.Spy;
  let modales: {
    config: MatDialogConfig;
    close: jasmine.Spy;
    closed: Subject<void>;
  }[];

  beforeEach(async () => {
    preparaciones$ = new ReplaySubject<Preparacion[]>(1);
    trucos$ = new ReplaySubject<Truco[]>(1);
    modales = [];
    open = jasmine.createSpy('open').and.callFake(
      (_component: unknown, config: MatDialogConfig) => {
        const closed = new Subject<void>();
        const close = jasmine.createSpy('close');
        modales.push({ config, close, closed });
        return { close, afterClosed: () => closed.asObservable() };
      },
    );
    aviso = jasmine.createSpy('open');

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([
          { path: '', component: HomeComponent },
          { path: 'otra', component: OtraPaginaComponent },
        ]),
        provideLocationMocks(),
        { provide: RecetasService, useValue: { getRecetas: () => of([]) } },
        {
          provide: PreparacionesService,
          useValue: { getPreparaciones: () => preparaciones$ },
        },
        { provide: TrucosService, useValue: { getTrucos: () => trucos$ } },
      ],
    })
      .overrideProvider(MatDialog, { useValue: { open } })
      .overrideProvider(MatSnackBar, { useValue: { open: aviso } })
      .overrideComponent(HomeComponent, { set: { template: '' } })
      .compileComponents();
    router = TestBed.inject(Router);
    router.setUpLocationChangeListener();
  });

  async function iniciar(url = '/'): Promise<HomeComponent> {
    harness = await RouterTestingHarness.create();
    return harness.navigateByUrl(url, HomeComponent);
  }

  function cargarDatos(): void {
    preparaciones$.next([preparacion]);
    trucos$.next([truco]);
  }

  for (const tipo of ['preparacion', 'truco', 'salsa'] as const) {
    const id = tipo === 'salsa' ? 'bechamel' : `${tipo}-1`;

    it(`updates the URL on ${tipo} click and removes only modal on close`, async () => {
      cargarDatos();
      const component = await iniciar('/?origen=compartido#sin-seccion');
      if (tipo === 'salsa') {
        component.verSalsa(SALSAS.find((s) => s.id === id)!);
      } else {
        component.abrirModalDeInfo(tipo === 'truco' ? truco : preparacion, tipo);
      }
      await harness.fixture.whenStable();

      expect(router.parseUrl(router.url).queryParams['modal']).toBe(`${tipo}:${id}`);
      expect(modales.length).toBe(1);
      expect(modales[0].config.data.nombre).toBe(
        tipo === 'salsa' ? 'Bechamel' : tipo === 'truco' ? truco.nombre : preparacion.nombre,
      );
      expect(modales[0].config.panelClass).toBe(
        tipo === 'salsa' ? 'modal-salsa' : 'modal-truco',
      );

      modales[0].closed.next();
      await harness.fixture.whenStable();

      expect(router.url).toBe('/?origen=compartido#sin-seccion');
      expect(open).toHaveBeenCalledTimes(1);
    });

    it(`opens a direct ${tipo} link after its data loads`, async () => {
      await iniciar(`/?modal=${tipo}:${id}`);
      if (tipo === 'salsa') {
        expect(modales.length).toBe(1);
      } else {
        expect(open).not.toHaveBeenCalled();
        expect(aviso).not.toHaveBeenCalled();
        cargarDatos();
        expect(modales.length).toBe(1);
      }
      cargarDatos();
      expect(open).toHaveBeenCalledTimes(1);
      expect(router.parseUrl(router.url).queryParams['modal']).toBe(`${tipo}:${id}`);
    });
  }

  it('keeps salsa identifiers unique even for sauces of the same type', () => {
    expect(new Set(SALSAS.map((s) => s.id)).size).toBe(SALSAS.length);
  });

  it('uses the salsa ID even when its name and type are different', async () => {
    cargarDatos();
    const component = await iniciar();
    const salsa = { ...SALSAS[0], id: 'id-estable', nombre: 'Nuevo nombre' };
    component.salsas = [salsa];
    component.verSalsa(salsa);
    await harness.fixture.whenStable();
    expect(router.parseUrl(router.url).queryParams['modal']).toBe('salsa:id-estable');
    expect(modales[0].config.data.nombre).toBe('Nuevo nombre');
  });

  it('closes on browser Back and reopens on browser Forward', async () => {
    cargarDatos();
    const component = await iniciar();
    component.abrirModalDeInfo(truco, 'truco');
    await harness.fixture.whenStable();
    const location = TestBed.inject(Location);

    const atras = firstValueFrom(
      router.events.pipe(filter((event) => event instanceof NavigationEnd)),
    );
    location.back();
    await atras;
    expect(modales[0].close).toHaveBeenCalled();
    expect(router.url).toBe('/');

    const adelante = firstValueFrom(
      router.events.pipe(filter((event) => event instanceof NavigationEnd)),
    );
    location.forward();
    await adelante;
    expect(open).toHaveBeenCalledTimes(2);
    expect(router.parseUrl(router.url).queryParams['modal']).toBe('truco:truco-1');
  });

  it('does not let a previous modal closing clear the new modal URL', async () => {
    cargarDatos();
    await iniciar('/?modal=preparacion:preparacion-1');
    await router.navigateByUrl('/?modal=salsa:bechamel');
    expect(modales[0].close).toHaveBeenCalled();
    modales[0].closed.next();
    await harness.fixture.whenStable();
    expect(router.parseUrl(router.url).queryParams['modal']).toBe('salsa:bechamel');
    expect(open).toHaveBeenCalledTimes(2);
  });

  it('does not reopen a modal when unrelated query parameters change', async () => {
    cargarDatos();
    await iniciar('/?modal=salsa:bechamel');
    await router.navigateByUrl('/?modal=salsa:bechamel&origen=otro');
    expect(open).toHaveBeenCalledTimes(1);
  });

  for (const valor of ['salsa:no-existe', 'truco:oculto', 'otro:1', '', 'salsa:bechamel:extra']) {
    it(`notifies and cleans up an unavailable or invalid link (${valor})`, async () => {
      cargarDatos();
      await iniciar(`/?origen=compartido&modal=${valor}`);
      await harness.fixture.whenStable();
      expect(open).not.toHaveBeenCalled();
      expect(aviso).toHaveBeenCalled();
      expect(router.url).toBe('/?origen=compartido');
    });
  }

  it('closes and unsubscribes when navigating away from the home', async () => {
    cargarDatos();
    await iniciar('/?modal=salsa:bechamel');
    await router.navigateByUrl('/otra');
    expect(modales[0].close).toHaveBeenCalled();
    modales[0].closed.next();
    cargarDatos();
    await harness.fixture.whenStable();
    expect(router.url).toBe('/otra');
    expect(open).toHaveBeenCalledTimes(1);
  });

  it('shows an error instead of producing an unshareable link without an ID', async () => {
    cargarDatos();
    const component = await iniciar();
    component.abrirModalDeInfo({ ...preparacion, id: undefined }, 'preparacion');
    expect(aviso).toHaveBeenCalled();
    expect(open).not.toHaveBeenCalled();
    expect(router.url).toBe('/');
  });
});
