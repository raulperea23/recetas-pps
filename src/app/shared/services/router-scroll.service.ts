import { ViewportScroller } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, PRIMARY_OUTLET, Router, Scroll } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouterScrollService {
  private readonly router = inject(Router);
  private readonly viewport = inject(ViewportScroller);
  private readonly destroyRef = inject(DestroyRef);
  private ultimaUrl: string | null = null;
  private readonly conservarPosicion = new Set<number>();

  constructor() {
    this.viewport.setHistoryScrollRestoration('manual');
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (
            this.ultimaUrl !== null &&
            this.soloCambiaModal(this.ultimaUrl, event.urlAfterRedirects)
          ) {
            this.conservarPosicion.add(event.id);
          }
          this.ultimaUrl = event.urlAfterRedirects;
        } else if (event instanceof Scroll) {
          if (this.conservarPosicion.delete(event.routerEvent.id)) return;
          if (event.position) {
            this.viewport.scrollToPosition(event.position);
          } else if (event.anchor) {
            this.viewport.scrollToAnchor(event.anchor);
          } else {
            this.viewport.scrollToPosition([0, 0]);
          }
        }
      });
  }

  private soloCambiaModal(anterior: string, siguiente: string): boolean {
    const desde = this.router.parseUrl(anterior);
    const hasta = this.router.parseUrl(siguiente);
    const esHome = (url: typeof desde) =>
      Object.keys(url.root.children).every(
        (outlet) =>
          outlet === PRIMARY_OUTLET &&
          url.root.children[outlet].segments.length === 0 &&
          Object.keys(url.root.children[outlet].children).length === 0,
      );
    if (!esHome(desde) || !esHome(hasta)) return false;
    if (desde.queryParamMap.get('modal') === hasta.queryParamMap.get('modal')) {
      return false;
    }
    delete desde.queryParams['modal'];
    delete hasta.queryParams['modal'];
    return this.router.serializeUrl(desde) === this.router.serializeUrl(hasta);
  }
}
