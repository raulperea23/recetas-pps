import { ViewportScroller } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Event, NavigationEnd, provideRouter, Router, Scroll } from '@angular/router';
import { Subject } from 'rxjs';
import { RouterScrollService } from './router-scroll.service';

describe('RouterScrollService', () => {
  let events: Subject<Event>;
  let viewport: jasmine.SpyObj<ViewportScroller>;
  let id: number;

  beforeEach(() => {
    events = new Subject<Event>();
    id = 0;
    viewport = jasmine.createSpyObj<ViewportScroller>('ViewportScroller', [
      'setHistoryScrollRestoration',
      'scrollToPosition',
      'scrollToAnchor',
    ]);
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ViewportScroller, useValue: viewport },
      ],
    });
    const router = TestBed.inject(Router);
    spyOnProperty(router, 'events', 'get').and.returnValue(events);
    TestBed.inject(RouterScrollService);
  });

  function navegar(url: string, position: [number, number] | null = null): void {
    const navigation = new NavigationEnd(++id, url, url);
    const anchor = TestBed.inject(Router).parseUrl(url).fragment;
    events.next(navigation);
    events.next(new Scroll(navigation, position, anchor));
  }

  function limpiarScroll(): void {
    viewport.scrollToPosition.calls.reset();
    viewport.scrollToAnchor.calls.reset();
  }

  for (const tipo of ['preparacion', 'truco', 'salsa']) {
    it(`does not move the viewport when opening or closing a ${tipo}`, () => {
      navegar('/');
      limpiarScroll();
      navegar(`/?modal=${tipo}:id-1`);
      navegar('/');
      expect(viewport.scrollToPosition).not.toHaveBeenCalled();
      expect(viewport.scrollToAnchor).not.toHaveBeenCalled();
    });
  }

  it('does not jump to an unchanged fragment during modal changes', () => {
    navegar('/?origen=compartido#salsas');
    limpiarScroll();
    navegar('/?origen=compartido&modal=salsa:bechamel#salsas');
    navegar('/?origen=compartido#salsas');
    expect(viewport.scrollToPosition).not.toHaveBeenCalled();
    expect(viewport.scrollToAnchor).not.toHaveBeenCalled();
  });

  it('preserves the current position during modal-only Back and Forward', () => {
    navegar('/');
    navegar('/?modal=truco:id-1');
    limpiarScroll();
    navegar('/', [0, 900]);
    navegar('/?modal=truco:id-1', [0, 1100]);
    expect(viewport.scrollToPosition).not.toHaveBeenCalled();
  });

  it('preserves normal navigation to the top and history restoration', () => {
    navegar('/');
    limpiarScroll();
    navegar('/recetas');
    expect(viewport.scrollToPosition).toHaveBeenCalledWith([0, 0]);
    navegar('/', [0, 1250]);
    expect(viewport.scrollToPosition).toHaveBeenCalledWith([0, 1250]);
    expect(viewport.setHistoryScrollRestoration).toHaveBeenCalledWith('manual');
  });

  it('keeps anchors working for direct modal links and fragment changes', () => {
    navegar('/?modal=salsa:bechamel#salsas');
    expect(viewport.scrollToAnchor).toHaveBeenCalledWith('salsas');
    limpiarScroll();
    navegar('/?modal=truco:id-1#trucos');
    expect(viewport.scrollToAnchor).toHaveBeenCalledWith('trucos');
  });

  it('does not suppress scroll for query changes unrelated to modals', () => {
    navegar('/?modal=salsa:bechamel');
    limpiarScroll();
    navegar('/?modal=salsa:bechamel&origen=otro');
    expect(viewport.scrollToPosition).toHaveBeenCalledWith([0, 0]);
  });

  it('does not suppress scroll on other pages with a modal query parameter', () => {
    navegar('/recetas?modal=uno');
    limpiarScroll();
    navegar('/recetas?modal=dos');
    expect(viewport.scrollToPosition).toHaveBeenCalledWith([0, 0]);
  });
});
