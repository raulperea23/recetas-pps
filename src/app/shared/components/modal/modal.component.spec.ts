import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { provideRouter, Router } from '@angular/router';
import { ModalComponent } from './modal.component';
import { CompartirComponent } from '../compartir/compartir.component';

describe('ModalComponent sharing', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let data: {
    id: string;
    tipo: string;
    tipoEnlace?: string;
    nombre: string;
    descripcion: string;
    icono: string;
    dificultad: string;
  };
  let close: jasmine.Spy;

  beforeEach(async () => {
    data = {
      id: 'id-1',
      tipo: 'truco',
      nombre: 'Contenido compartido',
      descripcion: 'Descripcion',
      icono: '',
      dificultad: 'Fácil',
    };
    close = jasmine.createSpy('close');
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [
        provideRouter([{ path: 'recetas/:id', component: ModalComponent }]),
        provideNoopAnimations(),
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: { close } },
      ],
    }).compileComponents();
  });

  for (const tipo of ['preparacion', 'truco', 'salsa']) {
    it(`focuses the title instead of Share when opening a ${tipo} dialog`, async () => {
      const dialog = TestBed.inject(MatDialog);
      const ref = dialog.open(ModalComponent, {
        data: {
          ...data,
          tipo: tipo === 'salsa' ? 'salsa' : 'truco',
          tipoEnlace: tipo,
        },
      });
      ref.componentRef?.changeDetectorRef.detectChanges();
      await firstValueFrom(ref.afterOpened());
      TestBed.inject(ApplicationRef).tick();
      await Promise.resolve();
      const titulo = document.querySelector('mat-dialog-container h2');
      expect(document.activeElement).toBe(titulo);
      expect(titulo?.textContent).toBe(data.nombre);
      expect(document.activeElement?.classList.contains('btn-compartir')).toBeFalse();
      ref.close();
      await firstValueFrom(ref.afterClosed());
    });

    it(`renders a share control with a canonical home link for ${tipo}`, () => {
      data.tipo = tipo === 'salsa' ? 'salsa' : 'truco';
      data.tipoEnlace = tipo;
      fixture = TestBed.createComponent(ModalComponent);
      fixture.detectChanges();
      const compartir = fixture.debugElement.query(By.directive(CompartirComponent))
        .componentInstance as CompartirComponent;
      const url = new URL(compartir.enlace);
      expect(url.origin).toBe(window.location.origin);
      expect(url.searchParams.get('modal')).toBe(`${tipo}:id-1`);
      expect(compartir.nombre).toBe(data.nombre);
      expect(compartir.soloIcono).toBeTrue();
      expect(compartir.encabezado).toBe(
        tipo === 'salsa' ? 'Mira esta salsa' : tipo === 'truco' ? 'Mira este truco' : 'Mira esta preparación',
      );
      fixture.nativeElement.querySelector('mat-dialog-actions button').click();
      expect(close).toHaveBeenCalled();
    });
  }

  it('shares the home salsa link when the modal was opened from a recipe', async () => {
    await TestBed.inject(Router).navigateByUrl('/recetas/origen');
    data.tipo = 'salsa';
    data.id = 'bechamel';
    fixture = TestBed.createComponent(ModalComponent);
    fixture.detectChanges();
    const url = new URL(fixture.componentInstance.enlaceCompartir);
    expect(url.searchParams.get('modal')).toBe('salsa:bechamel');
    expect(url.pathname).not.toContain('recetas');
  });

  it('does not add sharing to the recipe suggestion modal', () => {
    data.tipo = 'receta';
    fixture = TestBed.createComponent(ModalComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(CompartirComponent))).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Ver receta completa');
  });
});
