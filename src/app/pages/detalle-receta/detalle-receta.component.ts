import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  ],
  templateUrl: './detalle-receta.component.html',
  styleUrl: './detalle-receta.component.css',
})
export class DetalleRecetaComponent implements OnInit {
  receta: Receta | null = null;
  recetasRelacionadas: Receta[] = [];
  menuCompartirAbierto: boolean = false;
  enlaceCopiado: boolean = false;
  fotoActual: string = '';

  @ViewChild('compartirRef') compartirRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private recetasService: RecetasService,
    private title: Title,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.receta = null;
        this.recetasRelacionadas = [];
        this.fotoActual = '';

        this.recetasService
          .getRecetaPorId(id)
          .pipe(take(1))
          .subscribe((receta) => {
            this.receta = receta;
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

  get elaboracionFormateada(): string {
    return this.receta?.elaboracion?.replace(/&nbsp;/g, ' ') || '';
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

  toggleMenuCompartir(): void {
    this.menuCompartirAbierto = !this.menuCompartirAbierto;
    this.enlaceCopiado = false;
  }

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (
      this.menuCompartirAbierto &&
      this.compartirRef &&
      !this.compartirRef.nativeElement.contains(event.target)
    ) {
      this.menuCompartirAbierto = false;
    }
  }

  compartirWhatsApp(): void {
    const texto = `Mira esta receta: ${this.receta?.nombre} 😋\n${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
    this.menuCompartirAbierto = false;
  }

  copiarEnlace(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.enlaceCopiado = true;
      setTimeout(() => {
        this.enlaceCopiado = false;
        this.menuCompartirAbierto = false;
      }, 1500);
    });
  }
}
