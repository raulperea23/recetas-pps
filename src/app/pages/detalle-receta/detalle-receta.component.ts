import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs/operators';
import { CommonModule, DOCUMENT, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RecetasService } from '../../shared/services/recetas.service';
import { Receta, FotoReceta } from '../../shared/models/receta.model';
import { Title } from '@angular/platform-browser';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FotoDialogComponent } from '../../shared/components/foto-dialog/foto-dialog.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SALSAS, Salsa } from '../home/home.salsas';
import { CompartirComponent } from '../../shared/components/compartir/compartir.component';
import {
  Preparacion,
  PreparacionesService,
} from '../../shared/services/preparaciones.service';
import { Truco, TrucosService } from '../../shared/services/trucos.service';
import { ContenidoEnlazable, enlazarContenidos } from './enlazar-contenidos';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ContenidoModal extends ContenidoEnlazable {
  tipo: 'salsa' | 'preparacion' | 'truco';
  item: Salsa | Preparacion | Truco;
}

@Component({
  selector: 'app-detalle-receta',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    CompartirComponent,
  ],
  templateUrl: './detalle-receta.component.html',
  styleUrl: './detalle-receta.component.css',
})
export class DetalleRecetaComponent implements OnInit {
  receta: Receta | null = null;
  recetasRelacionadas: Receta[] = [];
  fotoActual: string = '';
  elaboracionFormateada = '';
  private preparaciones: Preparacion[] = [];
  private trucos: Truco[] = [];
  private contenidos: ContenidoModal[] = [];
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly preparacionesService = inject(PreparacionesService);
  private readonly trucosService = inject(TrucosService);
  private readonly snackBar = inject(MatSnackBar);

  constructor(
    private route: ActivatedRoute,
    private recetasService: RecetasService,
    private title: Title,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.preparacionesService
      .getPreparaciones()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items) => {
          this.preparaciones = items;
          this.actualizarElaboracion();
        },
        error: (error) => this.notificarErrorContenido(error),
      });
    this.trucosService
      .getTrucos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items) => {
          this.trucos = items;
          this.actualizarElaboracion();
        },
        error: (error) => this.notificarErrorContenido(error),
      });
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.receta = null;
        this.actualizarElaboracion();
        this.recetasRelacionadas = [];
        this.fotoActual = '';

        this.recetasService
          .getRecetaPorId(id)
          .pipe(take(1))
          .subscribe((receta) => {
            this.receta = receta;
            this.actualizarElaboracion();
            this.fotoActual = this.fotoPrincipal;
            this.title.setTitle(`${receta.nombre} | Paraíso Para Saborear`);

            // Incrementar visitas aquí, cuando la receta se ha cargado
            this.recetasService.incrementarVisitas(id);

            this.recetasService
              .getRecetasRelacionadas(receta.categoria, receta.tipoDePlato, id)
              .subscribe((relacionadas) => {
                this.recetasRelacionadas = relacionadas.slice(0, 12);
              });
          });
      }
    });
  }

  // ── Galería ──────────────────────────────────────────────────────────────

  get fotosOrdenadas(): FotoReceta[] {
    return (this.receta?.fotos ?? []).slice().sort((a, b) => a.orden - b.orden);
  }

  get fotoPrincipal(): string {
    if (this.receta?.fotos && this.receta.fotos.length > 0) {
      return this.fotosOrdenadas[0].url;
    }
    return this.receta?.foto || '';
  }

  get fotosSecundarias(): FotoReceta[] {
    return this.fotosOrdenadas.slice(1);
  }

  get tieneGaleria(): boolean {
    return !!this.receta?.fotos && this.receta.fotos.length > 1;
  }

  seleccionarFoto(url: string): void {
    this.fotoActual = url;
  }

  // ── Resto de métodos ─────────────────────────────────────────────────────

  private actualizarElaboracion(): void {
    this.contenidos = [];
    const agregar = (
      tipo: ContenidoModal['tipo'],
      items: (Salsa | Preparacion | Truco)[],
    ) => {
      for (const item of items) {
        if (!item.id || ('oculta' in item && item.oculta)) continue;
        const clave = `${tipo}:${item.id}`;
        const url = this.router.createUrlTree(['/'], {
          queryParams: { modal: clave },
        });
        this.contenidos.push({
          clave,
          nombre: item.nombre,
          href: this.location.prepareExternalUrl(this.router.serializeUrl(url)),
          exacto: tipo === 'salsa',
          tipo,
          item,
        });
      }
    };
    agregar('salsa', SALSAS);
    agregar('preparacion', this.preparaciones);
    agregar('truco', this.trucos);
    this.elaboracionFormateada = enlazarContenidos(
      this.receta?.elaboracion?.replace(/&nbsp;/g, ' ') || '',
      this.contenidos,
      this.document,
    );
  }

  private notificarErrorContenido(error: unknown): void {
    console.error('No se pudieron cargar los contenidos relacionados:', error);
    this.snackBar.open(
      'No se pudieron cargar algunos contenidos relacionados.',
      'Cerrar',
    );
  }

  onElaboracionClick(event: Event): void {
    if (!(event.target instanceof Element)) return;
    const elemento = event.target.closest<HTMLAnchorElement>('a.enlace-salsa');
    if (!elemento) return;
    const contenido = this.contenidos.find(
      (c) => c.href === elemento.getAttribute('href'),
    );
    if (!contenido) return;
    if (
      event instanceof MouseEvent &&
      (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0)
    ) return;
    event.preventDefault();
    const esSalsa = contenido.tipo === 'salsa';
    this.dialog.open(ModalComponent, {
      data: {
        ...contenido.item,
        tipo: esSalsa ? 'salsa' : 'truco',
        tipoEnlace: contenido.tipo,
      },
      maxWidth: '820px',
      width: '100%',
      panelClass: esSalsa ? 'modal-salsa' : 'modal-truco',
    });
  }

  abrirFoto(): void {
    this.dialog.open(FotoDialogComponent, {
      data: { foto: this.fotoActual, nombre: this.receta?.nombre },
      width: '85vw',
      maxWidth: '85vw',
      panelClass: 'foto-dialog',
    });
  }

  tieneFoto(): boolean {
    return !!this.fotoActual && this.fotoActual.trim() !== '';
  }
}
