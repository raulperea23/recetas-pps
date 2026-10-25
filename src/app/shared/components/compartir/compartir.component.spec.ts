import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompartirComponent } from './compartir.component';

describe('CompartirComponent', () => {
  let fixture: ComponentFixture<CompartirComponent>;
  let component: CompartirComponent;
  let writeText: jasmine.Spy;
  let aviso: jasmine.Spy;
  let clipboardOriginal: PropertyDescriptor | undefined;

  beforeEach(async () => {
    clipboardOriginal = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    writeText = jasmine.createSpy('writeText').and.resolveTo();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    aviso = jasmine.createSpy('open');
    await TestBed.configureTestingModule({
      imports: [CompartirComponent],
      providers: [provideNoopAnimations()],
    })
      .overrideProvider(MatSnackBar, { useValue: { open: aviso } })
      .compileComponents();
    fixture = TestBed.createComponent(CompartirComponent);
    component = fixture.componentInstance;
    component.nombre = 'Bechamel';
    component.enlace = 'https://ejemplo.com/?modal=salsa:bechamel';
    component.encabezado = 'Mira esta salsa';
    fixture.detectChanges();
  });

  afterEach(() => {
    if (clipboardOriginal) {
      Object.defineProperty(navigator, 'clipboard', clipboardOriginal);
    } else {
      Reflect.deleteProperty(navigator, 'clipboard');
    }
  });

  it('renders the same share menu and confirmation for 1500ms', fakeAsync(() => {
    const host: HTMLElement = fixture.nativeElement;
    host.querySelector<HTMLButtonElement>('.btn-compartir')!.click();
    fixture.detectChanges();
    expect(host.querySelector('mat-icon')!.textContent).toBe('share');
    expect(host.textContent).toContain('WhatsApp');
    expect(host.textContent).toContain('Copiar enlace');
    host.querySelectorAll<HTMLButtonElement>('.opcion-compartir')[1].click();
    flushMicrotasks();
    fixture.detectChanges();
    expect(writeText).toHaveBeenCalledWith(component.enlace);
    expect(host.textContent).toContain('Enlace copiado');
    tick(1499);
    expect(component.menuCompartirAbierto).toBeTrue();
    tick(1);
    fixture.detectChanges();
    expect(host.querySelector('.menu-compartir')).toBeNull();
  }));

  it('supports an accessible icon-only button with the same share menu', () => {
    component.soloIcono = true;
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    const boton = host.querySelector<HTMLButtonElement>('.btn-compartir-icono')!;
    expect(boton.classList.contains('btn-compartir')).toBeTrue();
    expect(boton.classList.contains('mat-mdc-outlined-button')).toBeTrue();
    expect(boton.getAttribute('aria-label')).toBe('Compartir');
    expect(boton.textContent?.trim()).toBe('share');
    boton.click();
    fixture.detectChanges();
    expect(boton.getAttribute('aria-expanded')).toBe('true');
    expect(host.textContent).toContain('WhatsApp');
    expect(host.textContent).toContain('Copiar enlace');
  });

  it('uses the same border, color and shape in both button variants', () => {
    const host: HTMLElement = fixture.nativeElement;
    host.style.setProperty('--primary-color', '#007bff');
    const estilosTexto = getComputedStyle(host.querySelector('button')!);
    const esperado = {
      borde: estilosTexto.borderTopStyle,
      ancho: estilosTexto.borderTopWidth,
      colorBorde: estilosTexto.borderTopColor,
      color: estilosTexto.color,
      radio: estilosTexto.borderTopLeftRadius,
    };
    component.soloIcono = true;
    fixture.detectChanges();
    const estilosIcono = getComputedStyle(host.querySelector('button')!);
    expect(estilosIcono.borderTopStyle).toBe('solid');
    expect(estilosIcono.borderTopWidth).not.toBe('0px');
    expect({
      borde: estilosIcono.borderTopStyle,
      ancho: estilosIcono.borderTopWidth,
      colorBorde: estilosIcono.borderTopColor,
      color: estilosIcono.color,
      radio: estilosIcono.borderTopLeftRadius,
    }).toEqual(esperado);
  });

  it('shares the name and direct modal link on WhatsApp', () => {
    const open = spyOn(window, 'open');
    component.toggleMenuCompartir();
    component.compartirWhatsApp();
    expect(open).toHaveBeenCalledWith(
      `https://wa.me/?text=${encodeURIComponent(`Mira esta salsa: Bechamel \n\n${component.enlace}`)}`,
      '_blank',
    );
    expect(component.menuCompartirAbierto).toBeFalse();
  });

  it('keeps recipe sharing using the current URL and original message', async () => {
    const open = spyOn(window, 'open');
    component.enlace = '';
    component.encabezado = 'Mira esta receta';
    component.compartirWhatsApp();
    await component.copiarEnlace();
    expect(writeText).toHaveBeenCalledWith(window.location.href);
    expect(open).toHaveBeenCalledWith(
      `https://wa.me/?text=${encodeURIComponent(`Mira esta receta: Bechamel \n\n${window.location.href}`)}`,
      '_blank',
    );
  });

  it('closes on outside mousedown but not inside the share menu', () => {
    component.toggleMenuCompartir();
    fixture.nativeElement.querySelector('.btn-compartir')
      .dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(component.menuCompartirAbierto).toBeTrue();
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(component.menuCompartirAbierto).toBeFalse();
  });

  it('shows a failure instead of a success when copying fails', async () => {
    writeText.and.rejectWith(new Error('Permission denied'));
    spyOn(console, 'error');
    await component.copiarEnlace();
    expect(aviso).toHaveBeenCalled();
    expect(component.enlaceCopiado).toBeFalse();
  });

  it('reports missing clipboard support', async () => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    spyOn(console, 'error');
    await component.copiarEnlace();
    expect(aviso).toHaveBeenCalled();
    expect(component.enlaceCopiado).toBeFalse();
  });

  it('clears an old confirmation timeout when reopening the menu', fakeAsync(() => {
    component.toggleMenuCompartir();
    component.copiarEnlace();
    flushMicrotasks();
    component.toggleMenuCompartir();
    component.toggleMenuCompartir();
    tick(1500);
    expect(component.menuCompartirAbierto).toBeTrue();
    expect(component.enlaceCopiado).toBeFalse();
  }));
});
